import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type CurrencyCode = "USD" | "NPR" | "EUR" | "GBP" | "AUD" | "CAD";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // relative to USD
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "NPR", symbol: "₨", name: "Nepali Rupee", rate: 133.5 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
];

interface CurrencyContextValue {
  currency: Currency;
  currencies: Currency[];
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD");

  const currency = currencies.find((c) => c.code === currencyCode)!;

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyCode(code);
  }, []);

  const formatPrice = useCallback(
    (priceInUsd: number) => {
      const converted = priceInUsd * currency.rate;
      return `${currency.symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, currencies, setCurrency, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
