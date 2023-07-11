import styled from "styled-components";
import { CurrencyResponse } from "@/interfaces/Currency";
import { fromATH, toATH } from "@/hooks/useAth";
import { formatNumber } from "@/utils/formatNumber";

const TableContainer = styled.div`
  max-width: 100%;
  overflow: auto hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  text-align: end;
  padding-left: ${({ theme }) => theme.sizes.l};
  padding-right: ${({ theme }) => theme.sizes.s};
  min-width: 140px;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.dark_green};
    text-align: start;
  }
`;

const Td = styled.td`
  text-align: end;
  padding-left: ${({ theme }) => theme.sizes.l};
  padding-right: ${({ theme }) => theme.sizes.s};
  min-width: 140px;

  &:first-child {
    text-align: start;
  }
`;

const Tr = styled.tr`
  height: 54px;
`;
const TrHead = styled.tr`
  height: 54px;
  background-color: ${({ theme }) => theme.colors.dark_green};
`;

const NameTd = styled(Td)`
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TableComponent = ({ data }: CurrencyResponse) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TrHead>
            <Th>Name</Th>
            <Th>Price USD</Th>
            <Th>Circulating Supply</Th>
            <Th>Market Cap</Th>
            <Th>Category</Th>
            <Th>From ATH</Th>
            <Th>To ATH</Th>
          </TrHead>
        </thead>
        <tbody>
          {data.map((currency) => (
            <Tr key={currency.key}>
              <NameTd>{currency.name}</NameTd>
              <Td>{formatNumber(currency.price.USD)}</Td>
              <Td>{formatNumber(currency.availableSupply)}</Td>
              <Td>${formatNumber(currency.marketCap)}</Td>
              <Td>{currency.category}</Td>
              <Td>
                -{fromATH(currency.athPrice.USD, currency.price.USD).toFixed(2)}
                %
              </Td>
              <Td>
                +{toATH(currency.athPrice.USD, currency.price.USD).toFixed(2)}%
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
