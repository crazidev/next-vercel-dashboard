import { Box } from "@radix-ui/themes";
import { NavBar } from "../components/NavBar";

export default function TransactionPage() {
  return (
    <div className="flex flex-row flex-grow gap-5 w-[100%]">
      <div className="flex flex-col flex-grow flex-[9] w-[100%]">
        <NavBar title="Transactions" description="Your transactions history" />

        <Box height={"20px"} />
      </div>
    </div>
  );
}
