import { WalletBalances } from "@/database/models/wallet_balances";
import { cFmt } from "@/lib/cFmt";
import { useAppSelector } from "@/lib/store/store";
import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export function ConverterText({
  amount: _amount,
  code,
  className,
  isCrypto,
}: {
  amount: number;
  code?: string;
  className?: string;
  isCrypto?: boolean;
}) {
  const convert = useAppSelector((state) => state.cryptoConvert);
  const [amount, setAmount] = useState(_amount);

  const convertCurrency = () => {
    var balance = _amount ?? 0;
    if (convert?.convert?.isReady == true) {
      var amount = convert.convert?.["USD"]?.[code ?? "USD"]?.(balance);
      if (amount) {
        setAmount(amount);
      }
    }
  };

  useEffect(() => {
    if (convert.isInitialized) {
      convert?.convert?.ready().then((value) => {
        convertCurrency();
      });
    }
  }, [convert, _amount]);

  return (
    <Text className={className}>
      {cFmt({
        amount: amount,
        code: code,
        isCrypto: isCrypto,
      })}
    </Text>
  );
}
