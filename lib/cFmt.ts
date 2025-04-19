import * as formatter from "currency-formatter";
import { formatCurrency } from "@coingecko/cryptoformat";

export const cFmt = ({
  amount,
  code,
  isCrypto = false,
}: {
  amount?: number;
  code?: string;
  isCrypto?: boolean;
}) =>
  amount == 0
    ? "0.00"
    : isCrypto
    ? formatCurrency(amount ?? 0, code ?? "USD", "en", true)
    : formatter.format(amount ?? 0, { code: code ?? "USD" });
