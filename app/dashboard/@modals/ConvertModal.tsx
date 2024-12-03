'use client';

import { authUser } from "@/actions/authUser";
import { ConvertInputCard } from "@/components/ConvertInputCard";
import { MyCard } from "@/components/MyCard";
import { Logo } from "@/components/shapes/logo";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { fetchUser } from "@/fetch/fetch_user";
// import { fetchUser } from "@/fetch/fetch_user";
import { fetchUserWallets } from "@/fetch/fetch_wallets";
import { cFmt } from "@/lib/cFmt";
import yup from "@/server/extra/yup";
import { CryptoConvertContext, useCryptoConvert } from "@context/CryptoConvertContext";
import { DashboardContext } from "@context/DashboardContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button, Card, Dialog, DropdownMenu, Heading, IconButton, Spinner, Text } from "@radix-ui/themes";
import Image from "next/image";
import { InputHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowDropDown, MdCurrencyExchange } from "react-icons/md";
import { TbArrowDown, TbEqual, TbMinus } from "react-icons/tb";
import { InferAttributes } from "sequelize";

export interface WalletType {
    name: string,
    icon?: string,
    value?: number,
    shortName?: string,
    onTap?: () => void
};

export default function ConvertModal() {
    const {
        register,
        watch,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(yup.object({
            amount: yup.number().min(0).required()
        }))
    });

    const [loading, setLoading] = useState(true);
    const [walletList, setWalletList] = useState<InferAttributes<WalletBalances>[]>([]);
    const [user, setUser] = useState<InferAttributes<Users>>(null);
    const [from, setFrom] = useState<WalletType>(null);
    const [to, setTo] = useState<WalletType>(null);
    const [selectedFrom, setSelectedFrom] = useState<InferAttributes<WalletBalances>>(null);
    const [converted, setConverted] = useState(0);
    const [input, setInput] = useState(0);
    const convert = useContext(CryptoConvertContext);
    const dashboardContext = useContext(DashboardContext);

    const loadData = async () => {
        try {
            setLoading(true);

            setUser(user);
            if (convert?.convert?.isReady != true) {
                await convert?.convert?.ready();
            }

            if (!dashboardContext.user && !dashboardContext.wallets) {
                await dashboardContext.fetchUser();
            }

            if (dashboardContext.wallets) {
                setWalletList(dashboardContext.wallets);
                var firstWallet = dashboardContext.wallets?.at(0);

                setTo({
                    name: firstWallet?.wallet?.name,
                    icon: firstWallet?.wallet?.icon,
                    value: firstWallet?.id,
                    shortName: firstWallet?.wallet?.shortName,
                });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    function convertAmount() {
        if ((input) && convert?.convert?.isReady) {
            try {
                var data = convert.convert[from?.shortName ?? "USD"][to?.shortName](input);
                setConverted(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        convertAmount();
    }, [input, from, to]);

    useEffect(() => {
        setSelectedFrom(walletList.find((e) => e.walletId == from?.value));
    }, [from, to]);

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button size={{ md: "3" }} radius="large" variant="outline">
                <MdCurrencyExchange /> Convert
            </Button>
        </Dialog.Trigger>

        {<Dialog.Content className="mobile:w-fit">
            <Dialog.Title>
                How much do you want to convert
            </Dialog.Title>
            {loading ? <Spinner className="m-auto my-[50px]" /> :
                <div>
                    <ConvertInputCard inputProps={{
                        type: "number",
                        min: 0,
                        onInput: (e) => {

                            if (e.currentTarget.valueAsNumber.toString() == "NaN" || e.currentTarget.valueAsNumber == 0) {
                                setInput(0);
                                setConverted(0);
                            } else {
                                setInput(e.currentTarget.valueAsNumber);
                            }

                            console.log(e.currentTarget.valueAsNumber);
                        },

                    }} active={from} className={'mt-5 mb-3'} title="Convert" placeholder="0.00" currency={
                        {
                            name: from?.name ?? "USD",
                            icon: from?.icon,
                            onSelect: (v) => setFrom(v),
                            dropdown: walletList.map((e) => {
                                return {
                                    name: e.wallet.name,
                                    icon: e.wallet?.icon,
                                    value: e.wallet.id,
                                    active: from?.value == e?.id,
                                    shortName: e.wallet.shortName
                                }
                            })
                        }
                    } />
                    <Text size={'1'}>
                        You have {" "}
                        <Text className="font-bold underline">
                            {cFmt({ amount: selectedFrom?.balance ?? (user?.accountBalance ?? 0) })}
                        </Text> {selectedFrom?.wallet?.shortName ?? "USD"} available balance
                    </Text>
                    <div className="flex flex-col gap-1 mt-3">
                        <div className="flex justify-between">
                            <Text size={'1'} className="font-bold flex flex-row items-center gap-3">
                                <TbMinus /> 1 USD
                            </Text>
                            <Text size={'1'} color="gray" className="text-right">
                                Our fee
                            </Text>
                        </div>
                        <div className="flex justify-between">
                            <Text size={'1'} className="font-bold flex flex-row items-center gap-3">
                                <TbEqual /> {converted} {to?.shortName}
                            </Text>
                            <Text size={'1'} color="gray" className="text-right">
                                Total amount we'll convert
                            </Text>
                        </div>
                    </div>

                    <div className="relative">
                        <ConvertInputCard inputProps={{
                            readOnly: true,

                        }} className={'mt-10'} title="To" placeholder={`${converted}`} currency={
                            {
                                name: to?.name ?? "",
                                icon: to?.icon,
                                onSelect: (v) => setTo(v),
                                dropdown: walletList.map((e) => {
                                    return {
                                        name: e.wallet.name,
                                        icon: e.wallet?.icon,
                                        value: e.wallet.id,
                                        active: to?.value == e?.id,
                                        shortName: e.wallet.shortName
                                    };
                                })
                            }
                        } />
                        <div className="border-[5px] rounded-md w-fit border-[--gray-2] absolute top-[-20px] mx-auto right-0 left-0">
                            <IconButton color="gray" className="bg-[--gray-4]" onClick={() => { }}>
                                <TbArrowDown /></IconButton>
                        </div>

                    </div>

                    <Button onClick={() => loadData()} className="mt-5 w-full">Continue</Button>

                </div>}
        </Dialog.Content>}
    </Dialog.Root>
}
