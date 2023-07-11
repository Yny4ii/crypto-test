"use client";
import { fetcher } from "@/api/fetcher";
import useSWR from "swr";
import { CurrencyResponse } from "@/interfaces/Currency";
import { TableComponent } from "@/components/Table";

export default function App() {
  const { data, error, isLoading } = useSWR<CurrencyResponse>(
    "https://tstapi.cryptorank.io/v0/coins?limit=15",
    fetcher,
  );
  if (error) return <div>Error</div>;
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <>
      <TableComponent data={data.data}></TableComponent>
    </>
  );
}
