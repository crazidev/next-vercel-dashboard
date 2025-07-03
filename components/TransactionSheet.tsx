import { useContext } from "react";
import { ThemeContext } from "./hooks/useThemeContext";
import { store, useAppSelector } from "@/lib/store/store";
import { authSlice } from "@/lib/store/slices/authSlice";
import useLayout from "./hooks/useLayout";
import { TransactionDetails } from "./TransactionDetails";

export function TransactionSheet() {
  var transaction = useAppSelector((state) => state.auth.transaction);
  var user = useAppSelector((state) => state.auth.user);

  return (
    <TransactionDetails
      transaction={transaction}
      open={transaction != null}
      currentUserId={user?.user_id}
      onOpenChange={(value) => {
        if (!value) {
          store.dispatch(authSlice.actions.setTransaction(null));
        }
      }}
    />
  );
}
