import { useQuery } from "@tanstack/react-query";
import { fetchInstruments } from "../api/instrumentApi";

interface Instrument {
    id: string;
    symbol: string;
    name: string;
    description: string;
    type: string;
    strike: number;
}

export const useIntruments = () => {
    const { data, isLoading, error } = useQuery<Instrument[], Error>({
    queryKey: ['instruments'],
    queryFn: fetchInstruments,
  });

  return { data, isLoading, error };
};