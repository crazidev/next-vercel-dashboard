'use client';

import { ConvertInputCard } from "@/components/ConvertInputCard";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
// import { fetchUser } from "@/fetch/fetch_user";
import { CryptoConvertContext } from "@context/CryptoConvertContext";
import { DashboardContext } from "@context/DashboardContext";
import { Button, Callout, Dialog, IconButton, Spinner, Text } from "@radix-ui/themes";
import { FormEvent, useContext, useEffect, useState } from "react";
import { MdCurrencyExchange, MdSwapVert } from "react-icons/md";
import { TbArrowDown, TbInfoCircle } from "react-icons/tb";
import { MiniChart } from "react-ts-tradingview-widgets";
import { InferAttributes } from "sequelize";
import ComparisonChart from "@/components/tradingview/ComparisonChart"
import { getFormattedSymbol } from "@/lib/symbolUtils";
import { cFmt } from "@/lib/cFmt";
import { useIsMobile } from "@/components/hooks/use-mobile";
import useLayout from "@/components/hooks/useLayout";
import { error } from "console";
import { toast } from "sonner";
import { convert_action } from "@/actions/convert_action";
import logger from "@/lib/logger";

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
    error?: string,
    rootError?: string,
    isSubmitting?: boolean,
    selectFrom?: InferAttributes<WalletBalances>,
}

export const main = (value) => {
    return {
        name: "USD",
        shortName: "USD",
        icon: null,
        type: "fiat",
        value: -1,
        hide: value == -1
    } as WalletType;
}

export default function ConvertModal({
    walletList,
    user
}: {
    walletList: InferAttributes<WalletBalances>[],
    user: InferAttributes<Users>
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeInput, setActiveInput] = useState<'input_1' | 'input_2'>(null);
    const [fee, setFee] = useState(0);
    const convert = useContext(CryptoConvertContext);
    const dashboardContext = useContext(DashboardContext);
    const layout = useLayout()

    const [state, setState] = useState<ConvertState>({
        loading: false,
        convertedAmount: 0,
        input: 0,
        dropDownFrom: [],
        dropDownTo: []
    });

    const loadData = async () => {
        logger("Running: LoadData");
        try {
            setState(prev => ({ ...prev, loading: true }));
            if (convert?.convert?.isReady != true) {
                await convert?.convert?.ready();
            }

            var firstWallet = walletList?.at(1);

            setState(prev => ({
                ...prev,
                from: main(state?.to?.value),
                loading: false,
                to: {
                    name: firstWallet?.wallet?.name,
                    icon: firstWallet?.wallet?.icon,
                    value: firstWallet?.id,
                    type: firstWallet?.wallet?.type,
                    shortName: firstWallet?.wallet?.shortName,
                }
            }));



        } catch (error) {
            console.error('Error fetching data:', error);
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    function convertAmount() {
        var _convertedAmount = 0;
        var _convertFiat = 0;
        var _inputFiat = 0;
        if (convert?.convert?.isReady == true) {

            if (state.from?.type == 'fiat' || state.from?.type == 'crypto') {
                if (activeInput == 'input_1') {
                    _inputFiat = convert.convert[state.from?.shortName]['USD'](state.input);
                } else {
                    _inputFiat = convert.convert[state.to?.shortName]['USD'](state.input);

                }
                setState(prev => ({
                    ...prev,
                    inputFiat: _inputFiat,
                    error: null
                }));
            }


            if (state.to?.type == 'fiat' || state.to?.type == 'crypto') {
                if (activeInput == 'input_1') {
                    _convertedAmount = convert.convert[state.from?.shortName][state.to?.shortName](state.input - fee);
                    _convertFiat = convert.convert[state.to?.shortName]['USD'](_convertedAmount);
                } else {
                    _convertedAmount = convert.convert[state.to?.shortName][state.from?.shortName](state.input - fee);
                    _convertFiat = convert.convert[state.from?.shortName]['USD'](_convertedAmount);
                }

                setState(prev => ({
                    ...prev,
                    convertFiat: _convertFiat,
                    error: null
                }));
            }

            if (activeInput == 'input_1') {
                var input = document.getElementById('converted_input') as HTMLInputElement;
                if (input?.value !== undefined) {
                    input.value = (_convertedAmount ? _convertedAmount : 0).toString()
                }
            } else {
                var input = document.getElementById('amount_input') as HTMLInputElement;
                if (input?.value !== undefined) {
                    input.value = (_convertedAmount ? _convertedAmount : 0).toString()
                }
            }
        }
    }

    function handleOnInput(e: FormEvent<HTMLInputElement>) {
        var value = parseFloat(e.currentTarget?.value ?? "0");
        if (value.toString() == "NaN" || value == 0) {
            setState(prev => ({
                ...prev,
                input: 0,
            }));
        } else {
            setState(prev => ({
                ...prev,
                input: value,
            }));
        }

    }

    function canConvert() {
        return state.input
            && convert?.convert?.isReady
            && state.from?.type !== 'share'
            && state.to?.type !== 'share'
            && state.from?.type !== 'stock'
            && state.to?.type !== 'stock';
    }

    function setWalletList() {
        logger("Running: setWalletList");
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

        setState(prev => ({
            ...prev,
            dropDownFrom: [main(state?.to?.value), ...dropdownFrom],
            dropDownTo: [main(state?.to?.value), ...dropdownTo].filter((e) => e.value != state.from?.value),
            selectFrom: walletList.find((e) => e.id == state.from?.value)
        }));
    }

    function swapCurrency() {
        setState(prev => ({
            ...prev,
            from: state.to,
            to: state.from,
        }));
    }

    async function submit() {
        var balance = state.selectFrom?.balance ?? (user?.accountBalance ?? 0);
        if (balance < state.inputFiat) {
            setState(prev => ({
                ...prev,
                error: "Insufficient balance",
            }));
            toast.error("Insufficient balance");
        }

        try {
            setState(prev => ({
                ...prev,
                isSubmitting: true,
                rootError: null
            }));

            var res = await convert_action({
                user_id: user.id,
                from: {
                    fiat: state.inputFiat,
                    converted: state.input,
                    currency: state.from.shortName,
                    wallet_id: state.from.value
                },
                to: {
                    fiat: state.convertFiat,
                    converted: state.convertedAmount,
                    currency: state.to.shortName,
                    wallet_id: state.to.value
                },
                fromType: state?.from?.value == -1 ? 'main' : 'wallet'
            });

            if (res.success) {
                setIsOpen(false);
                setState(prev => ({
                    ...prev,
                    input: 0,
                    inputFiat: 0,
                    convertFiat: 0,
                    convertedAmount: 0,
                    rootError: null
                }));

                toast.success(res.message);

            } else {
                setState(prev => ({
                    ...prev,
                    rootError: res.message
                }));
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                isSubmitting: false,
                rootError: "Unknown error occurred"
            }));
        } finally {
            setState(prev => ({
                ...prev,
                isSubmitting: false,
            }));
        }
    }

    useEffect(() => {
        loadData();
        setWalletList()
    }, [isOpen]);

    useEffect(() => {
        if (convert.convert != null && convert.convert?.USD != undefined) {
            try {
                convertAmount();
            } catch (error) {
                console.error(error);
            }
        }
    }, [state.input, state.from, state.to, convert.convert]);

    useEffect(() => {
        setWalletList()
    }, [isOpen, state.to, state.from]);

    return <Dialog.Root open={isOpen} onOpenChange={(value) => {
        setIsOpen(value);
    }}>
        <Dialog.Trigger>
            <Button size={{ md: "3" }} radius="large" variant="outline">
                <MdCurrencyExchange /> Convert
            </Button>
        </Dialog.Trigger>

        {<Dialog.Content className="mobile:w-fit tablet:min-w-[500px] tablet:w-[500px] lg:min-w-[800px]">
            <Dialog.Title trim={'end'} className="">
                How much do you want to convert?
            </Dialog.Title>
            <Text size={'1'} trim={'start'} color="gray" style={{
                lineHeight: '5px'
            }} className=" mb-5">Convert funds between wallets. Select the source wallet, target wallet, and amount for a seamless transfer.</Text>

            {state.rootError && (
                <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                    <Callout.Icon>
                        <TbInfoCircle />
                    </Callout.Icon>
                    <Callout.Text>{state.rootError}</Callout.Text>
                </Callout.Root>
            )}

            {state.loading ? <Spinner className="m-auto my-[50px]" /> :
                <div className="flex flex-row mobile:flex-col-reverse tablet:flex-col items-start gap-5">
                    <div className="tablet:w-full mobile:w-full w-[50%]">
                        <ConvertInputCard
                            inputProps={{
                                id: 'amount_input',
                                type: "number",
                                defaultValue: 0,
                                autoFocus: false,
                                onFocus: (e) => setActiveInput('input_1'),
                                onInput: (e) => {
                                    if (activeInput == 'input_1') {
                                        handleOnInput(e)
                                    }
                                }
                            }}
                            active={state.from}
                            subtitle={state.inputFiat}
                            className={'mt-5 mb-3'}
                            title="Convert"
                            placeholder="0"
                            currency={
                                {
                                    name: state.from?.name,
                                    icon: state.from?.icon,
                                    onSelect: (v) => {
                                        var to = state.to?.value == v?.value ? state?.from : state.to;
                                        setState(prev => ({
                                            ...prev,
                                            from: v,
                                        }));
                                    },
                                    dropdown: state.dropDownFrom
                                }
                            } />

                        <div className="flex flex-row justify-between">
                            {state.error ? <Text trim={'both'} size={'1'} color="red" className="animate-bounce direction-normal">{state.error}</Text> : <div></div>}
                            <Text trim={'both'} size={'1'} color="gray">Available Balance: <b>{cFmt({ amount: state?.selectFrom?.balance ?? (user?.accountBalance ?? 0) })} {state?.selectFrom?.wallet?.shortName}</b>.</Text>
                        </div>

                        <div className="relative mt-10">
                            <ConvertInputCard inputProps={{
                                autoFocus: false,
                                id: 'converted_input',
                                onFocus: (e) => setActiveInput('input_2'),
                                onInput: (e) => {
                                    if (activeInput == 'input_2') {
                                        handleOnInput(e)
                                    }
                                }
                            }}
                                active={state.to}
                                className={'mt-10'}
                                title="To"
                                placeholder={`0`}
                                subtitle={state.convertFiat}
                                currency={
                                    {
                                        name: state.to?.name ?? "",
                                        icon: state.to?.icon,
                                        onSelect: (v) => setState(prev => ({
                                            ...prev, to: v
                                        })),
                                        dropdown: state.dropDownTo
                                    }
                                } />


                            <div className="border-[5px] rounded-md w-fit border-[--gray-2] absolute top-[-20px] mx-auto right-0 left-0">
                                <IconButton className="bg-[--accent-9]" onClick={() => swapCurrency()}>
                                    <MdSwapVert /></IconButton>
                            </div>

                            <div className="flex flex-col gap-1 mt-5">
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
                        <Button loading={state.isSubmitting} disabled={!(state.from && state.to && state.inputFiat > 0 && state.convertFiat > 0) || state.isSubmitting} size={'3'} onClick={() => submit()} className="mt-5 w-full">Submit</Button>
                    </div>

                    {/* Wallet Chart */}
                    {((state.from && state.to) &&
                        <>
                            <div className="tablet:w-full mobile:w-full flex-grow pointer-events-none cursor-none">
                                <MiniChart
                                    symbol={getFormattedSymbol(state?.from?.shortName, state?.to?.shortName)}
                                    colorTheme="dark"
                                    isTransparent
                                    height={layout.isMobile ? 200 : layout.isTablet ? 250 : 350}
                                    width="100%"
                                ></MiniChart>
                            </div></>
                    )}
                </div>
            }
        </Dialog.Content>}
    </Dialog.Root>
}
