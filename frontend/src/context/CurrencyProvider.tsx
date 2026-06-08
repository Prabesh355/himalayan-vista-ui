import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type React from "react";

type CurrencyCode = "USD" | "NPR" | "INR" | "EUR" | "GBP";

type CurrencyOption = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rate: number;
};

const currencyOptions: CurrencyOption[] = [
  { code: "USD", label: "USD", symbol: "$", rate: 1 },
  { code: "NPR", label: "NPR", symbol: "Rs", rate: 133 },
  { code: "INR", label: "INR", symbol: "₹", rate: 83 },
  { code: "EUR", label: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", label: "GBP", symbol: "£", rate: 0.79 },
];

type CurrencyContextValue = {
  currency: CurrencyCode;
  currencies: CurrencyOption[];
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (usdPrice?: number | string | null) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const stored = localStorage.getItem("currency") as CurrencyCode | null;
    if (stored && currencyOptions.some((option) => option.code === stored)) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    localStorage.setItem("currency", nextCurrency);
  };

  const value = useMemo<CurrencyContextValue>(() => {
    const selected = currencyOptions.find((option) => option.code === currency) || currencyOptions[0];

    return {
      currency,
      currencies: currencyOptions,
      setCurrency,
      formatPrice: (usdPrice) => {
        const numeric = Number(usdPrice || 0);
        const converted = numeric * selected.rate;
        const maximumFractionDigits = selected.code === "USD" || selected.code === "EUR" || selected.code === "GBP" ? 2 : 0;
        return `${selected.symbol} ${converted.toLocaleString(undefined, {
          maximumFractionDigits,
        })}`;
      },
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return context;
}
