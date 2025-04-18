import { NavBar } from "@/components/NavBar";
import { Users } from "@/database/models/users";
import { DropdownMenu, Flex, Text } from "@radix-ui/themes";
import UsersTable from "./users_table";
import getSequelizeInstance from "@/database/db";
import { Wallets } from "@/database/models/wallets";
import { WalletBalances } from "@/database/models/wallet_balances";
import { admin_delete_user_action } from "@/actions/admin/delete_user_action";

export default async function Page() {
    await getSequelizeInstance();
    var users = await Users.findAll({
        include: [
            {
                model: WalletBalances,
                as: "walletBalances",
                include: [
                    {
                        model: Wallets,
                        as: "wallet",
                    },
                ],
            },
        ],
    });

    return (
        <div className="flex flex-row flex-grow gap-5 w-[100%]">
            <div className="flex flex-col flex-grow flex-[9] w-[100%]">
                <NavBar title="User's Management" description="" />
                <Flex className="md:flex-row flex-col justify-between gap-5 md:gap-10">
                    <div>
                        <UsersTable users={users.map((e) => e.toJSON())} />
                    </div>
                </Flex>
            </div>
        </div>
    )
}


export function DeleteUserActionButton({ user }) {
    return <DropdownMenu.Item onClick={async () => {
        'use server';
        await admin_delete_user_action({ userId: user.id });
    }}>Delete User</DropdownMenu.Item>;
}