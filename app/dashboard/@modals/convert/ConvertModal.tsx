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
import { Button, Card, DataList, Dialog, DropdownMenu, Heading, IconButton, Spinner, Text } from "@radix-ui/themes";
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
    hide?: boolean,
    type: 'crypto' | 'stock' | 'share' | 'fiat'
    onTap?: () => void
};

interface ConvertState {
    loading: boolean,
    convertedAmount: number,
    convertFiat?: number,
    input: number,
    inputFiat?: number,
    from?: WalletType,
    dropDownFrom?: WalletType[],
    dropDownTo?: WalletType[],
    to?: WalletType,
    selectFrom?: InferAttributes<WalletBalances>,
}

export default function ConvertModal({
    walletList,
    user
}: {
    walletList: InferAttributes<WalletBalances>[],
    user: InferAttributes<Users>
}) {
    const [state, setState] = useState<ConvertState>({
        loading: false,
        convertedAmount: 0,
        input: 0,
        dropDownFrom: [],
        dropDownTo: []
    });

    const [isOpen, setIsOpen] = useState(false);
    const [fee, setFee] = useState(0);
    const convert = useContext(CryptoConvertContext);
    const dashboardContext = useContext(DashboardContext);
    var main: WalletType = {
        name: "USD",
        shortName: "USD",
        icon: null,
        type: "fiat",
        value: -1,
        hide: state.to?.value == -1
    };

    const loadData = async () => {
        console.log("Running: LoadData");
        try {
            setState({ ...state, loading: true });
            if (convert?.convert?.isReady != true) {
                await convert?.convert?.ready();
            }

            var firstWallet = walletList?.at(1);
            console.log("First wallet:", firstWallet);

            setState({
                ...state,
                from: main,
                loading: false,
                to: {
                    name: firstWallet?.wallet?.name,
                    icon: firstWallet?.wallet?.icon,
                    value: firstWallet?.id,
                    type: firstWallet?.wallet?.type,
                    shortName: firstWallet?.wallet?.shortName,
                }
            });



        } catch (error) {
            console.error('Error fetching data:', error);
            setState({ ...state, loading: false });
        }
    };

    function canConvert() {
        return state.input 
        && convert?.convert?.isReady 
        && state.from?.type !== 'share' 
        && state.to?.type !== 'share' 
        && state.from?.type !== 'stock' 
        && state.to?.type !== 'stock';
    }

    function convertAmount() {
        console.log("Running: convertAmount");
        if (canConvert()) {
            try {

                var data = convert.convert[state.from?.shortName][state.to?.shortName](state.input - fee);
                var data1 = convert.convert[state.from?.shortName]['USD'](state.input.toFixed(2));
                var data2 = convert.convert[state.to?.shortName]['USD'](data);

                setState({
                    ...state,
                    convertedAmount: data,
                    convertFiat: data2,
                    inputFiat: data1,
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    function setWalletList() {
        console.log("Running: setWalletList");
        var dropdownFrom: WalletType[] = walletList.map((e) => {
            return {
                name: e.wallet.name,
                icon: e.wallet?.icon,
                value: e.id,
                type: e.wallet?.type,
                hide: state.to?.value == e?.id,
                shortName: e.wallet.shortName
            }
        });

        var dropdownTo: WalletType[] = walletList.map((e) => {
            return {
                name: e.wallet.name,
                icon: e.wallet?.icon,
                value: e.id,
                type: e.wallet?.type,
                hide: state.from?.value == e?.id,
                shortName: e.wallet.shortName
            }
        });

        setState({
            ...state,
            dropDownFrom: [main, ...dropdownFrom],
            dropDownTo: [main, ...dropdownTo].filter((e) => e.value != state.from?.value),
            selectFrom: walletList.find((e) => e.walletId == state.from?.value)
        });
    }

    useEffect(() => {
        loadData();
    }, [isOpen]);

    useEffect(() => {
        convertAmount();
    }, [state.input, state.from, state.to]);

    useEffect(() => {
        setWalletList()
    }, [isOpen, state.to, state.from]);

    return <Dialog.Root onOpenChange={(value) => {
        setIsOpen(value);
    }}>
        <Dialog.Trigger>
            <Button size={{ md: "3" }} radius="large" variant="outline">
                <MdCurrencyExchange /> Convert
            </Button>
        </Dialog.Trigger>

        {<Dialog.Content className="mobile:w-fit">
            <Dialog.Title>
                How much do you want to convert
            </Dialog.Title>
            {state.loading ? <Spinner className="m-auto my-[50px]" /> :
                <div>
                    <ConvertInputCard
                        inputProps={{
                            type: "number",
                            onInput: (e) => {
                                if (e.currentTarget.valueAsNumber.toString() == "NaN" || e.currentTarget.valueAsNumber == 0) {
                                    setState({
                                        ...state,
                                        convertedAmount: 0,
                                        input: 0
                                    });
                                } else {
                                    setState({
                                        ...state,
                                        input: e.currentTarget.valueAsNumber,
                                    });
                                }
                            },

                        }}
                        active={state.from}
                        subtitle={state.inputFiat}
                        className={'mt-5 mb-3'}
                        title="Convert"
                        placeholder="0.00"
                        currency={
                            {
                                name: state.from?.name,
                                icon: state.from?.icon,
                                onSelect: (v) => {
                                    var to = state.to?.value == v?.value ? state?.from : null;
                                    setState({
                                        ...state, from: v, to: to,
                                        input: 0, convertedAmount: 0,
                                    });
                                },
                                dropdown: state.dropDownFrom
                            }
                        } />



                    <div className="relative">
                        <ConvertInputCard inputProps={{
                            readOnly: true,
                            value: state.convertedAmount,
                        }}
                            active={state.to}
                            className={'mt-10'}
                            title="To"
                            placeholder={`0.00`}
                            subtitle={state.convertFiat}
                            currency={
                                {
                                    name: state.to?.name ?? "",
                                    icon: state.to?.icon,
                                    onSelect: (v) => setState({
                                        ...state, to: v
                                    }),
                                    dropdown: state.dropDownTo
                                }
                            } />
                        <div className="border-[5px] rounded-md w-fit border-[--gray-2] absolute top-[-20px] mx-auto right-0 left-0">
                            <IconButton color="gray" className="bg-[--gray-4]" onClick={() => { }}>
                                <TbArrowDown /></IconButton>
                        </div>

                        <div className="flex flex-col gap-1 mt-3">
                            <div className="flex justify-between">
                                <Text size={'1'} color="gray" className="text-right">
                                    Transaction Fee
                                </Text>
                                <Text size={'1'} className="font-bold flex flex-row items-center gap-3">
                                    ≈ {fee} USD
                                </Text>

                            </div>
                            {canConvert() &&
                                <div className="flex justify-between">
                                    <Text size={'1'} color="gray" className="text-right">
                                        Rate
                                    </Text>
                                    <Text size={'1'} className="font-bold flex flex-row items-center gap-3">
                                        1 {state?.from?.shortName} ≈ {convert.convert[state?.from?.shortName ?? 'USD'][state?.to?.shortName ?? 'USD'](1)} {state.to?.shortName}
                                    </Text>
                                </div>}
                        </div>
                    </div>

                    <Button onClick={() => loadData()} className="mt-5 w-full">Continue</Button>

                </div>}
        </Dialog.Content>}
    </Dialog.Root>
}
