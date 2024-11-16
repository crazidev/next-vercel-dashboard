var formatter = require("currency-formatter");

export const cFmt = ({
  amount,
  code,
}: {
  amount?: number;
  code?: string;
}) => formatter.format(amount ?? 0, { code: "USD" });
