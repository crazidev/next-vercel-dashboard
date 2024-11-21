// import CryptoConvert from "crypto-convert";
// export const convert = new CryptoConvert();

export const fetchExchange = async ({
  from,
  to,
  amount,
}: {
  from: any;
  to: any;
  amount: number;
}) =>
  await fetch(
    `https://api.coinconvert.net/convert/${from}/${to}?amount=${amount}`,
    {
      cache: "default",
    }
  );
