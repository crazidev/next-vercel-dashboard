import * as formatter from "currency-formatter";
import { formatCurrency } from "@coingecko/cryptoformat";

export const cFmt = ({ amount, code }: { amount?: number; code?: string }) =>
  formatter.format(amount ?? 0, { code: code ?? "USD" });
