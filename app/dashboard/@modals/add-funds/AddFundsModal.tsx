'use client';

import { Users } from "@/database/models/users"
import { WalletBalances } from "@/database/models/wallet_balances"
import { Button, Callout, Card, Dialog, IconButton, Separator, Text } from "@radix-ui/themes"
import Image from "next/image";
import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import { InferAttributes } from "sequelize"
import { WalletType } from "../convert/ConvertModal";
import { Logo } from "@/components/shapes/logo";
import { MyCard } from "@/components/MyCard";
import { TbCopy, TbInfoCircle } from "react-icons/tb";
import { CTextField } from "@/components/CTextField";



export function AddFundsModal({
    walletList,
    user
}: {
    walletList: InferAttributes<WalletBalances>[],
    user: InferAttributes<Users>
}) {
    var main: WalletType = {
        name: "Main Account",
        shortName: "USD",
        icon: null,
        type: "fiat",
        value: -1,
    };

    const [isOpen, setIsOpen] = useState(true);
    const [list, setList] = useState<WalletType[]>([]);
    const [selected, setSelected] = useState<number>(-1);
    const [selectedWallet, setSelectedWallet] = useState<InferAttributes<WalletBalances>>(null);


    useEffect(() => {
        var list: WalletType[] = walletList.map((e) => {
            return {
                name: e.wallet.name,
                icon: e.wallet?.icon,
                value: e.id,
                type: e.wallet?.type,
                shortName: e.wallet.shortName
            }
        });

        setList(prev => [main, ...list]);
        setSelected(list.at(0).value);

    }, [isOpen]);

    useEffect(() => {
        var _wallet = walletList.find((e) => e.id == selected);
        setSelectedWallet(_wallet);
    }, [selected]);

    function CopyButton(value: any) {
        return <IconButton variant="ghost"><TbCopy /></IconButton>;
    }
    return <>
        <Dialog.Root open={isOpen} onOpenChange={(value) => {
            setIsOpen(value);
        }}>
            <Dialog.Trigger>
                <Button size={{ md: "3" }} radius="large" variant="outline">
                    <MdAdd /> Add Funds
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="mobile:w-fit tablet:min-w-[500px] tablet:w-[500px] lg:min-w-[800px]">
                <Dialog.Title trim={'end'} className="">
                    Fund your account
                </Dialog.Title>
                <Text size={'1'} trim={'start'} color="gray" style={{
                    lineHeight: '5px'
                }} className=" mb-5">Easily choose a wallet to fund, including your Main Account or Sub-Wallets, with detailed wallet information displayed for clarity.</Text>


                {/* <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                    <Callout.Icon>
                        <TbInfoCircle />
                    </Callout.Icon>
                    <Callout.Text></Callout.Text>
                </Callout.Root> */}

                <div className="flex mt-7 gap-5">
                    <div className="w-[30%] mobile:w-fit tablet:w-fit flex flex-col gap-2">
                        {list.map((e) =>
                            <div onClick={(i) => setSelected(e.value)}>
                                <MyCard size={'1'} className={`px-2 h-auto py-2 outline-0 flex flex-row items-center gap-2 cursor-pointer font-bold ${(selected == e.value) ? "!bg-[--accent-5] border-2 border-[--accent-5]" : "!bg-transparent"}`}>
                                    <div className="">
                                        {e.icon && <Image
                                            className="my-auto rounded-full"
                                            src={e.icon ?? ""}
                                            width={20}
                                            height={20}
                                            alt={"logo"}
                                        />}
                                        {e.value == -1 && <Logo className={"h-[20px] w-[20px] fill-primary-700"} />}
                                    </div>
                                    <div className="mobile:hidden">
                                        <Text size={'1'}>{e.name}</Text>
                                    </div>
                                </MyCard>
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Separator orientation={'vertical'} className="h-full" />
                    </div>
                    {selected == -1 && <div className="flex flex-grow flex-col gap-2">
                        <CTextField value={'Wells Fargo'} label="Bank Name" readOnly />
                        <CTextField value={`${user.firstName} ${user.lastName}`} label="Account Holder" rightIcon={CopyButton(`${user.firstName} ${user.lastName}`)} readOnly />
                        <CTextField value={user.id} label="Account Number" rightIcon={CopyButton(`${user.id}`)} readOnly />
                        <CTextField value={user.id} label="Routing Number" rightIcon={CopyButton(`${user.id}`)} readOnly />
                    </div>}

                    {selected != -1 && <div className="flex flex-grow flex-col gap-2">
                        <CTextField value={`${selectedWallet?.wallet?.name}`} label="Wallet Name" readOnly />
                        <CTextField value={`${selectedWallet?.wallet?.network}`} label="Network" readOnly />
                        <CTextField value={`${selectedWallet?.wallet?.walletAddress}`} label="Wallet Address" rightIcon={CopyButton(`${selectedWallet?.wallet?.walletAddress}`)} readOnly />
                    </div>}
                </div>

            </Dialog.Content>
        </Dialog.Root>
    </>
}