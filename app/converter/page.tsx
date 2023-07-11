"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Currency } from "@/interfaces/Currency";
import { fetcher } from "@/api/fetcher";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const ConverterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.xxl};
  margin-top: ${({ theme }) => theme.sizes.xxl};
`;
const InputContainer = styled.div`
  max-width: 300px;
  width: 100%;
  height: ${({ theme }) => theme.sizes.xxl};

  &:nth-child(2) {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.sizes.xxl};
  }
`;

const SelectContainer = styled.select`
  max-width: 300px;
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.xxl};
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
`;
const Page = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("ethereum");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("0");
  const { data, error, isLoading } = useSWR(
    "https://tstapi.cryptorank.io/v0/coins?limit=15",
    fetcher,
  );
  const {
    data: dataFromCurrency,
    error: errorFromCurrency,
    isLoading: isLoadingFromCurrency,
  } = useSWR(`https://tstapi.cryptorank.io/v0/coins/${fromCurrency}`, fetcher);
  const {
    data: dataToCurrency,
    error: errorToCurrency,
    isLoading: isLoadingToCurrency,
  } = useSWR(`https://tstapi.cryptorank.io/v0/coins/${toCurrency}`, fetcher);

  useEffect(() => {
    if (data && dataFromCurrency && dataToCurrency) {
      setCurrencies(data.data);
      const result = (
        (dataFromCurrency.data.price.USD * amount) /
        dataToCurrency.data.price.USD
      ).toFixed(4);
      setResult(result);
    }
  }, [amount, dataFromCurrency, dataToCurrency]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseFloat(e.target.value))) {
      setAmount(parseFloat(e.target.value));
    }
  };

  if (error || errorToCurrency || errorFromCurrency) return <div>Error</div>;
  if (
    isLoading ||
    !data ||
    isLoadingFromCurrency ||
    !dataFromCurrency ||
    !isLoadingToCurrency ||
    !dataToCurrency
  )
    return <div>Loading...</div>;

  return (
    <Container>
      <ConverterContainer>
        <InputContainer>
          <Input type="number" value={amount} onChange={onChangeInput} />
        </InputContainer>
        <InputContainer>
          <SelectContainer
            value={fromCurrency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFromCurrency(e.target.value.toLowerCase())
            }
          >
            {currencies.map((currency) => (
              <option key={currency.key} value={currency.key}>
                {currency.name}
              </option>
            ))}
          </SelectContainer>
          <SelectContainer
            value={toCurrency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setToCurrency(e.target.value)
            }
          >
            {currencies.map((currency: Currency) => (
              <option key={currency.key} value={currency.key}>
                {currency.name}
              </option>
            ))}
          </SelectContainer>
        </InputContainer>
        <div>{amount && fromCurrency && toCurrency ? result : 0}</div>
      </ConverterContainer>
    </Container>
  );
};

export default Page;
