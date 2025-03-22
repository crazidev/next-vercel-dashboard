import { NavBar } from "@/components/NavBar";
import { Users } from "@/database/models/users";
import { Flex, Text } from "@radix-ui/themes";
import UsersTable from "./users_table";
import getSequelizeInstance from "@/database/db";
import { Wallets } from "@/database/models/wallets";
import { WalletBalances } from "@/database/models/wallet_balances";

export default async function Page() {
    await getSequelizeInstance();

    return (
        <div className="flex flex-row flex-grow gap-5 w-[100%]">
            <div className="flex flex-col flex-grow flex-[9] w-[100%]">
                <NavBar title="Livechat & Support" description="" />
                <Flex className="md:flex-row flex-col justify-between gap-5 md:gap-10">
                    <div>
                    </div>
                </Flex>
            </div>
        </div>
    )
}