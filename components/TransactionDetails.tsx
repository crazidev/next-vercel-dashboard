"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  Calendar,
  Clock,
  Hash,
  DollarSign,
  Bitcoin,
} from "lucide-react";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge, ScrollArea, Separator } from "@radix-ui/themes";
import { Transactions } from "@/database/models/transactions";
import { InferAttributes } from "sequelize";
import { ThemeContext } from "./hooks/useThemeContext";
import useLayout from "./hooks/useLayout";
import { cFmt } from "@/lib/cFmt";
import { ConverterText } from "./ConverterText";

interface TransactionDetailsProps {
  transaction: InferAttributes<Transactions> | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile?: boolean;
}

// Replace the existing component logic with this updated version
export function TransactionDetails({
  transaction,
  open,
  onOpenChange,
  currentUserId,
}: TransactionDetailsProps & { currentUserId?: number }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  var context = useContext(ThemeContext);
  var { isMobile } = useLayout();

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!transaction) return null;

  console.log("==>", currentUserId, transaction?.userId);

  // Determine if this is a receive transaction (money coming to user)
  const isReceive = transaction?.userId !== currentUserId;

  const statusColor = {
    completed: "bg-green-500/10 text-green-700 border-green-200",
    pending: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    failed: "bg-red-500/10 text-red-700 border-red-200",
  };

  const CurrencyIcon =
    transaction?.paymentMethod === "crypto" ? Bitcoin : DollarSign;

  // Format the date
  const transactionDate = new Date(transaction?.createdAt);
  const formattedDate = transactionDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = transactionDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          context.dark ? "bg-[var(--color-background)]" : "bg-white",
          "dark:border-t-card-border-dark border-t-card-border-light",
          "w-full sm:max-w-md top-0 border-0",
          isMobile ? " rounded-t-3xl" : ""
        )}
      >
        <SheetHeader className="text-center">
          <SheetTitle>{isReceive ? "Money received" : "Money sent"}</SheetTitle>
        </SheetHeader>

        <ScrollArea>
          <div className="flex flex-col gap-4">
            {/* Transaction Icon and Amount */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className={cn(
                  "relative flex items-center justify-center w-16 h-16 rounded-full",
                  isReceive ? "bg-green-500/10" : "bg-red-500/10"
                )}
              >
                {isReceive ? (
                  <ArrowDownLeft className="w-8 h-8 text-green-600" />
                ) : (
                  <ArrowUpRight className="w-8 h-8 text-red-600" />
                )}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background border-2 border-background rounded-full flex items-center justify-center">
                  <img
                    src={transaction.wallet.icon || "/placeholder.svg"}
                    alt={transaction.wallet.name}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-bold">
                  {isReceive ? "+" : "-"}

                  <ConverterText
                    amount={transaction.amount}
                    code={transaction.wallet.shortName}
                    isCrypto={transaction.wallet.type !== "fiat"}
                  />
                </div>

                {transaction?.wallet?.type !== "fiat" && (
                  <div className="text-sm text-muted-foreground">
                    ≈ {cFmt({ amount: transaction.amount })}
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3">
              <Separator />

              <div className="px-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {isReceive ? "From" : "To"}
                  </span>
                  <div className="text-right flex items-center gap-2">
                    {transaction.wallet.type == "crypto" ||
                    transaction.wallet.type == "stock" ? (
                      <div>
                        <div className="text-sm font-medium">
                          {transaction.wallet.name} Wallet
                        </div>
                        <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                          {transaction.beneficiaryName?.slice(0, 6)}...
                          {transaction.beneficiaryName?.slice(-4)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-muted"
                            onClick={() =>
                              copyToClipboard(
                                transaction.beneficiaryName,
                                "from"
                              )
                            }
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        {copiedField === "from" && (
                          <span className="text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm font-medium">
                        {transaction.beneficiaryName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <div
                    className={cn(
                      "text-[12px] w-fit mt-1 py-[2px] px-2 text-center rounded-full",
                      transaction.status === "completed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    )}
                  >
                    {transaction.status === "completed"
                      ? "Successful"
                      : "Pending"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </span>
                  <span className="text-sm">{formattedDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </span>
                  <span className="text-sm">{formattedTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Method</span>
                  <span className="text-sm capitalize">
                    {transaction.paymentMethod}
                    {transaction?.wallet?.network && (
                      <span className="text-sm">
                        {" "}
                        ({transaction.wallet.network})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <Separator />

              {transaction.narration && (
                <div className="px-4 space-y-2">
                  <span className="text-sm font-medium">Description</span>
                  <p className="text-[12px] text-muted-foreground">
                    {transaction.narration}
                  </p>
                </div>
              )}

              <Separator />

              <div className="space-y-2 px-3">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-3 h-3" />
                  Transaction Reference
                </span>
                <div className="flex items-center gap-2 px-2 bg-muted rounded-md">
                  <span className="text-xs font-mono flex-1 truncate">
                    {transaction.reference}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      copyToClipboard(transaction.reference, "reference")
                    }
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                {copiedField === "reference" && (
                  <span className="text-xs text-green-600">Copied!</span>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-col sm:flex-col gap-2">
          <SheetClose asChild>
            <Button variant="secondary" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
