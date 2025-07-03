"use client";

import { cFmt } from "@/lib/cFmt";
import { IconButton, Text, Flex, Badge } from "@radix-ui/themes";
import { Transactions } from "@/database/models/transactions";
import Image from "next/image";
import { WalletAddSvg, WalletMinusSvg } from "./icons/SvgIcons";
import { twMerge } from "tailwind-merge";
import { store, useAppSelector } from "@/lib/store/store";
import { useState, useEffect } from "react";
import { Item } from "@radix-ui/themes/components/checkbox-group.primitive";
import { authSlice } from "@/lib/store/slices/authSlice";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import transaction from "sequelize/lib/transaction";

interface TransactionComponentProps {
  item: Transactions;
  user: any;
}

export function TransactionComponent({
  item,
  user,
}: TransactionComponentProps) {
  var isDebit = item.beneficiaryId !== user.user_id;

  const convert = useAppSelector((state) => state.cryptoConvert);
  const [amount, setAmount] = useState(item.amount);

  //   const convertCurrency = () => {
  //     var balance = item.amount ?? 0;
  //     if (convert?.convert?.isReady == true) {
  //       var amount =
  //         convert.convert?.["USD"]?.[item?.wallet?.shortName ?? "USD"]?.(balance);
  //       if (amount) {
  //         setAmount(amount);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     if (convert.isInitialized) {
  //       convert?.convert?.ready().then((value) => {
  //         convertCurrency();
  //       });
  //     }
  //   }, [convert, item]);

  return (
    <tr
      key={item.id}
      onClick={() => {
        store.dispatch(authSlice.actions.setTransaction(item));
        store.dispatch(authSlice.actions.setUser(user));
      }}
      className="flex items-center border-card-background-light dark:border-card-background-dark bg-card-background-light hover:bg-[var(--accent-3)] dark:bg-card-background-dark backdrop-blur-sm mb-3 py-2 border-b-2 h-[65px] transition-colors duration-300 cursor-pointer md:table-row"
    >
      {/* Status Icon */}
      <td className="w-[65px]">
        <div className="flex flex-col items-center text-center space-y-2">
          <div
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full",
              !isDebit ? "bg-green-500/10" : "bg-red-500/10"
            )}
          >
            {!isDebit ? (
              <ArrowDownLeft className=" text-green-600" />
            ) : (
              <ArrowUpRight className=" text-red-600" />
            )}
            <div className="absolute -bottom-2 -right-2 p-[2px] bg-background border-2 border-background rounded-full flex items-center justify-center">
              <img
                src={item.wallet.icon || "/placeholder.svg"}
                alt={item.wallet.name}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
            </div>
          </div>
        </div>
      </td>

      {/* Narration */}
      <td className="flex-1 text-nowrap overflow-hidden">
        <div>
          <Text
            className="pr-[20px] text-ellipsis line-clamp-2 truncate"
            as="div"
            weight={"bold"}
            size="1"
          >
            {isDebit ? (
              <>{item.wallet.name} sent</>
            ) : (
              <>{item.wallet.name} received</>
            )}
          </Text>
          <Text
            className="pr-[20px] text-ellipsis line-clamp-2 truncate"
            as="div"
            size="1"
            weight={"light"}
            color="gray"
          >
            {isDebit ? "To" : "From"}: {item.beneficiaryName}
          </Text>
        </div>
        <div className="flex items-end gap-2 lg:hidden">
          <Text as="div" size="1" className="text-[10px] text-[var(--gray-9)]">
            {item.createdAt?.toLocaleDateString()}
          </Text>
        </div>
      </td>

      {/* Date */}
      <td className="hidden lg:table-cell">
        <Text className="text-[13px] text-[var(--gray-9)]">
          {item.createdAt?.toLocaleDateString()}
        </Text>
      </td>

      {/* Payment Method */}
      <td className="hidden lg:table-cell">
        <Badge size="1" className="capitalize" color="blue">
          {item.wallet?.type
            ? item.wallet.name
            : item.paymentMethod.replaceAll("_", " ")}
        </Badge>
      </td>

      {/* Amount */}
      <td className="text-right whitespace-nowrap">
        <Flex direction="column" align={"end"} className="mx-2">
          <Text
            size="1"
            as="div"
            color={item.beneficiaryId === user.user_id ? "green" : "red"}
            className="font-mono"
          >
            {cFmt({ amount: amount, isCrypto: true })}
          </Text>
          <div>
            <div
              className={twMerge(
                "text-[8px] w-fit md:text-[10px] mt-1 py-[2px] px-2 font-bold text-center rounded-lg",
                item.status === "completed"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-yellow-500/10 text-yellow-500"
              )}
            >
              {item.status === "completed" ? "Successful" : "Pending"}
            </div>
          </div>
        </Flex>
      </td>
    </tr>
  );
}
