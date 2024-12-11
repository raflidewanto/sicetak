import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api";
import { FIVE_MINUTES_IN_MS } from "@/constants/data";

// deprecated
export function useCustomers(agreementNo: string) {
  return useQuery({
     queryKey: ["customers", agreementNo],
     queryFn: () => getCustomers({ agreement_no: agreementNo }), 
     staleTime: FIVE_MINUTES_IN_MS,
     enabled: () => agreementNo != null
  });
}