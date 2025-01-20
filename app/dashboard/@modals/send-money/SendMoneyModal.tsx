'use client';

import { ConvertInputCard } from "@/components/ConvertInputCard";
import { Users } from "@/database/models/users"
import { WalletBalances } from "@/database/models/wallet_balances"
import { Button, Card, Dialog, IconButton, Text } from "@radix-ui/themes"
import { FormEvent, useContext, useEffect, useState } from "react"
import { TbNumber, TbSend2 } from "react-icons/tb"
import { InferAttributes } from "sequelize"
import { WalletType } from "../convert/ConvertModal";
import { CryptoConvertContext } from "@context/CryptoConvertContext";
import { CheckCheck, CheckCircle, Circle, ClipboardPaste, RouteIcon, UserRound } from "lucide-react";
import { CTextField } from "@/components/CTextField";
import Image from "next/image";
import { cFmt } from "@/lib/cFmt";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/server/extra/yup";

export function SendMoneyModal({
    walletList,
    user
}: {
    walletList: InferAttributes<WalletBalances>[],
    user: InferAttributes<Users>
}) {
    const [bankTransferMethod, setBankTransferMethod] = useState<'wire' | 'ACH'>('wire');

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        watch: crypto_watch,
        reset: crypto_reset,
        clearErrors: crypto_clear_errors,
        formState: { errors: crypto_errors },
    } = useForm({
        resolver: yupResolver(yup.object({
            wallet_address: yup.string().required("Wallet address is required"),
        }))
    });

    const {
        register,
        handleSubmit,
        watch: bank_watch,
        reset: bank_reset,
        clearErrors: bank_clear_errors,
        formState: { errors: bank_error },
    } = useForm({
        resolver: yupResolver(yup.object({
            account_name: yup.string().required("Recipient's name is required"),
            account_number: yup.string().required("Account number is required"),
            routing: yup.string().required(bankTransferMethod == 'wire' ? "SWIFT/Routing number" : "Routing number" + " is required"),
        }))
    });


    var main: WalletType = {
        name: "Main Account",
        shortName: "USD",
        icon: null,
        type: "fiat",
        value: -1,
        hide: false
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [sendFrom, setSendFrom] = useState<WalletType>(main);
    const [sendFromWallet, setSendWallet] = useState<InferAttributes<WalletBalances>>(null);
    const [fiat, setFiat] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [error, setBError] = useState<string>(null);
    const convert = useContext(CryptoConvertContext);

    var dropdownFrom: WalletType[] = walletList.map((e) => {
        return {
            name: e.wallet.name,
            icon: e.wallet?.icon,
            value: e.id,
            type: e.wallet?.type,
            hide: false,
            shortName: e.wallet.shortName
        }
    });


    function handleOnInput(e: FormEvent<HTMLInputElement>) {
        var value = parseFloat(e.currentTarget?.value ?? "0");
        if (value.toString() == "NaN" || value == 0) {
            setAmount(0);
        } else {
            setAmount(value);
        }
    }

    function calculateFiat() {
        if (sendFrom.type == 'crypto') {
            var _inputFiat = convert.convert[sendFrom.shortName]['USD'](amount);
            setFiat(_inputFiat);
        } else {
            setFiat(amount);
        }
    }

    useEffect(() => {
        bank_reset();
        crypto_reset();
    }, [isOpen]);

    useEffect(() => {
        calculateFiat();
        setSendWallet(walletList.find((e) => e.id == sendFrom?.value));
    }, [amount, sendFrom]);

    useEffect(() => {
        bank_reset();
        crypto_reset();
    }, [sendFrom, bankTransferMethod]);


    return <>
        <Dialog.Root open={isOpen} onOpenChange={(value) => {
            setIsOpen(value);
        }}>
            <Dialog.Trigger>
                <Button size={{ md: "3" }} radius="large" variant="outline">
                    <TbSend2 /> Transfer
                </Button>
            </Dialog.Trigger>


            <Dialog.Content className="mobile:w-fit tablet:min-w-[500px] tablet:w-[500px] lg:min-w-[800px]">
                <Dialog.Title trim={'end'} className="">
                    Transfer Securely
                </Dialog.Title>
                <Dialog.Description style={{
                    lineHeight: "20px"
                }}>
                    <Text size={'1'} trim={'start'} color="gray" className=" mb-5">Effortlessly transfer funds, whether it's a bank transfer or crypto transaction. Enjoy a seamless and secure experience every time.</Text>
                </Dialog.Description>

                {/* {state.rootError && (
                    <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                        <Callout.Icon>
                            <TbInfoCircle />
                        </Callout.Icon>
                        <Callout.Text>{state.rootError}</Callout.Text>
                    </Callout.Root>
                )} */}

                <div className="flex mobile:flex-col tablet:flex-col tablet:gap-5 gap-5 mt-5">
                    <div className="w-full">
                        <Text size={'2'} trim={'end'} weight={'bold'} className="mt-7">Transfer from</Text>
                        <ConvertInputCard
                            inputProps={{
                                id: 'amount_input',
                                type: "number",
                                defaultValue: 0,
                                autoFocus: false,
                                // onFocus: (e) => setActiveInput('input_1'),
                                onInput: (e) => {
                                    handleOnInput(e)
                                }
                            }}
                            active={sendFrom}
                            subtitle={fiat}
                            className={'mt-3 mb-2'}
                            title="Amount"
                            placeholder="0"
                            currency={
                                {
                                    name: sendFrom?.name,
                                    icon: sendFrom?.icon,
                                    onSelect: (v) => {
                                        setSendFrom(v);
                                    },
                                    dropdown: [main, ...dropdownFrom]
                                }
                            }
                        />

                        <div className="flex flex-row justify-between mb-5">
                            {error ? <Text trim={'both'} size={'1'} color="red" className="animate-bounce direction-normal">{error}</Text> : <div></div>}
                            <Text trim={'both'} className="text-[10px] text-right" size={'1'} color="gray">Available Balance: <b>{cFmt({ amount: sendFromWallet?.balance ?? (user?.accountBalance ?? 0) })} {sendFromWallet?.wallet?.shortName}</b></Text>
                        </div>

                        {sendFrom.type == 'fiat' && (<div>
                            <div className="flex flex-row gap-4 mt-2">
                                <CheckButton title={"Wire Transfer"} onClick={() => {
                                    setBankTransferMethod('wire');
                                }} check={bankTransferMethod == 'wire'} />
                                <CheckButton title={"ACH Transfer"} onClick={() => {
                                    setBankTransferMethod('ACH');
                                }} check={bankTransferMethod == 'ACH'} />
                            </div>

                            <div className="mt-2 text-purple-500 text-[10px] leading-normal">
                                {bankTransferMethod == "ACH" ? "An affordable and reliable option for transferring money between U.S. bank accounts, typically processed within 1-3 business days." : "A fast and secure option for sending money domestically or internationally, with domestic transfers usually processed the same day and international transfers taking 1-2 business days."}
                            </div>


                        </div>)}
                        <div className="mt-5">
                            <Text size={'2'} weight={'bold'} className="mt-7">Transfer to</Text>

                            <div className="w-full gap-2">
                                <Card className={`mt-2 py-2`}>
                                    <div className="flex flex-row items-center" >
                                        <div className="flex flex-col flex-grow">
                                            {sendFrom.type == "fiat" ? <>
                                                <div>
                                                    <Text size={'1'} color="gray">
                                                        {bank_watch().account_name} - {bank_watch().account_number}
                                                    </Text>
                                                </div>

                                                <div className="flex flex-row gap-1">
                                                    <Text className="text-[10px] font-bold">{bankTransferMethod == 'wire' ? "SWIFT/Routing number" : "Routing number"}:</Text>
                                                    <Text className="text-[10px] text-primary-500"> {bank_watch().routing}</Text>
                                                </div></> : <>
                                                <Text size={'1'} color="gray">
                                                    {crypto_watch().wallet_address}
                                                </Text></>}

                                        </div>
                                        <Dialog.Root open={isOpen2} onOpenChange={(value) => {
                                            setIsOpen2(value);
                                        }}>
                                            <Dialog.Trigger>
                                                <Button variant="ghost" size={'1'}>Edit</Button>
                                            </Dialog.Trigger>

                                            <Dialog.Content>
                                                <Dialog.Title className="flex items-center">
                                                    <div className="flex flex-grow">Edit Recipient Details</div>
                                                    <Dialog.Close>
                                                        <Button color="red" variant="ghost" size={'1'}>Close</Button>
                                                    </Dialog.Close>
                                                </Dialog.Title>
                                                <form className="gap-2 flex flex-col" onSubmit={sendFrom.type == "fiat" ? handleSubmit(() => {
                                                    setIsOpen2(false);
                                                }) : handleSubmit2(() => {
                                                    setIsOpen2(false);
                                                })}>
                                                    {sendFrom.type == "fiat" && (<>
                                                        <CTextField
                                                            label="Recipient's name"
                                                            placeholder="Enter recipient's name"
                                                            leftIcon={<UserRound size={15} />}
                                                            error={bank_error?.account_name?.message.toString()}
                                                            register={register("account_name")}
                                                        />
                                                        <CTextField
                                                            label="Bank account number"
                                                            placeholder="Enter account number"
                                                            leftIcon={<TbNumber size={15} />}
                                                            error={bank_error?.account_number?.message.toString()}
                                                            register={register("account_number")}
                                                        />
                                                        <CTextField
                                                            label={bankTransferMethod == 'wire' ? "SWIFT/Routing number" : "Routing number"}
                                                            placeholder="Enter routing number"
                                                            leftIcon={<RouteIcon size={15} />}
                                                            error={bank_error?.routing?.message.toString()}
                                                            register={register("routing")}
                                                        /></>)}
                                                    {sendFrom.type != "fiat" && (<>
                                                        <CTextField
                                                            label={``}
                                                            placeholder={`Recipient ${sendFrom.name.toLowerCase()} address`}
                                                            leftIcon={<Image
                                                                className="my-auto rounded-full"
                                                                src={sendFrom.icon ?? ""}
                                                                width={20}
                                                                height={20}
                                                                alt={"logo"}
                                                            />}
                                                            rightIcon={<IconButton variant="soft" color="gray" radius="full"><ClipboardPaste size={15} /></IconButton>}
                                                            error={crypto_errors?.wallet_address?.message.toString()}
                                                            register={register2("wallet_address")}
                                                        />
                                                    </>)}

                                                    <Button loading={false} size={'3'} type="submit" className="mt-5 w-full">Save</Button>
                                                </form>
                                            </Dialog.Content>
                                        </Dialog.Root>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Text size={'1'} weight={'bold'} className="mt-7"></Text>
                        <Button loading={false} size={'3'} onClick={() => { }} className="mt-5 w-full">Submit</Button>
                    </div>

                </div>
            </Dialog.Content >
        </Dialog.Root >
    </>
}

function CheckButton({
    title, onClick, check
}: { title: string, onClick: () => void, check: boolean }) {
    return <Button onClick={onClick} className="text-[10px] md:text-[12px]" radius="full" variant={check ? "solid" : "surface"}>
        {!check ? <Circle size={15} /> : <CheckCheck size={15} />}
        {title}
    </Button>;
}