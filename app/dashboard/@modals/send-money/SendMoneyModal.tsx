import { Users } from "@/database/models/users"
import { WalletBalances } from "@/database/models/wallet_balances"
import { Button } from "@radix-ui/themes"
import { MdAdd } from "react-icons/md"
import { TbSend2 } from "react-icons/tb"
import { InferAttributes } from "sequelize"



export function SendMoneyModal({
    walletList,
    user
}: {
    walletList: InferAttributes<WalletBalances>[],
    user: InferAttributes<Users>
}) {
    return <>
        <Button size={{ md: "3" }} radius="large" variant="outline">
            <TbSend2 /> Send Money
        </Button>
    </>
}