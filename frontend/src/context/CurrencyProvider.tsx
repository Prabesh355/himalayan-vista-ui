import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type CurrencyCode = "USD" | "NPR" | "EUR" | "GBP" | "AUD" | "CAD";

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // relative to USD
}

export const currencies: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "USD ($)", rate: 1 },
  { code: "NPR", symbol: "₨", label: "NPR (₨)", rate: 133.5 },
  { code: "EUR", symbol: "€", label: "EUR (€)", rate: 0.92 },
  { code: "GBP", symbol: "£", label: "GBP (£)", rate: 0.79 },
  { code: "AUD", symbol: "A$", label: "AUD (A$)", rate: 1.53 },
  { code: "CAD", symbol: "C$", label: "CAD (C$)", rate: 1.36 },
];

interface CurrencyContextValue {
  /** The currently selected currency code (e.g. "USD") */
  currency: CurrencyCode;
  /** All available currency options */
  currencies: CurrencyOption[];
  /** Switch the active currency */
  setCurrency: (code: CurrencyCode) => void;
  /** Format a USD price into the active currency */
  formatPrice: (priceInUsd: number) => string;
}

const defaultCurrency: CurrencyCode = "USD";

const defaultCurrencyContext: CurrencyContextValue = {
  currency: defaultCurrency,
  currencies,
  setCurrency: () => {},
  formatPrice: (priceInUsd: number) => {
    const active = currencies[0];
    return `${active.symbol}${priceInUsd.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  },
};

const CurrencyContext = createContext<CurrencyContextValue>(defaultCurrencyContext);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(defaultCurrency);

  const active = currencies.find((c) => c.code === currencyCode)!;

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyCode(code);
  }, []);

  const formatPrice = useCallback(
    (priceInUsd: number) => {
      const converted = priceInUsd * active.rate;
      return `${active.symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    },
    [active]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency: currencyCode,
        currencies,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  return useContext(CurrencyContext);
}
