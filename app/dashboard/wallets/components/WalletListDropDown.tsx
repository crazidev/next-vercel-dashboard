'use client';

import { DropdownMenu, Text } from "@radix-ui/themes";
import { Logo } from "app/auth/components/shapes/logo";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { TbSwitchVertical } from "react-icons/tb";
import { WalletBalances } from "server/database/models/wallet_balances";

export const WalletListDropDown = (

    { wallet: wallet_shortname,
        wallet_list,
        onCheckChange,
        trigger,
        showAll,
    }: {
        wallet: any,
        wallet_list?: WalletBalances[],
        onCheckChange?: (data?: WalletBalances) => void,
        trigger?: React.ReactNode,
        showAll?: boolean | false
    }
) => {

    var router = useRouter();
    var path = "";
    var splittedPath = usePathname().split('[').at(0);

    if (splittedPath?.startsWith('/dashboard/wallets')) {
        path = '/dashboard/wallets';
    } else if (splittedPath?.startsWith('/dashboard/transactions')) {
        path = '/dashboard/transactions';
    }   

    {/* Wallet Select */ }
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            {trigger ?? <div className="flex justify-center gap-1 text-[12px] text-gray-500">
                <div>Switch</div> <TbSwitchVertical size={16} />
            </div>}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size={"2"} align="start">
            {showAll && <DropdownMenu.CheckboxItem
                checked={wallet_shortname == undefined}
                shortcut=""
                onCheckedChange={(value) => {
                    router.push(`${path}`);
                }}
                className="flex items-center gap-3"
            >
                All
            </DropdownMenu.CheckboxItem>}
            <DropdownMenu.CheckboxItem
                checked={(!showAll && wallet_shortname == undefined) || wallet_shortname == 'main'}
                shortcut=""
                onCheckedChange={(value) => {
                    router.push(`${path}/main`);
                }}
                className="flex items-center gap-3"
            >
                <Logo className={"h-[20px] w-[20px] fill-primary-700"} /> Main
                Account
            </DropdownMenu.CheckboxItem>

            {wallet_list &&
                wallet_list.map((wallet) => (
                    <DropdownMenu.CheckboxItem
                        key={wallet.id}
                        checked={wallet_shortname == wallet?.wallet?.shortName}
                        shortcut=""
                        onCheckedChange={(value) => {
                            router.push(`${path}/${wallet.wallet?.shortName}`);
                        }}
                        className="flex items-center gap-3"
                    >
                        <Image
                            className="my-auto rounded-full"
                            src={wallet.wallet?.icon ?? ""}
                            width={20}
                            height={20}
                            alt={"logo"}
                        />
                        <Text>{wallet.wallet?.name}</Text>
                    </DropdownMenu.CheckboxItem>
                ))}
        </DropdownMenu.Content>
    </DropdownMenu.Root>;

}