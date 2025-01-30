'use client';

import { admin_add_transaction_action } from "@/actions/admin/add_transaction";
import { admin_update_user_balance_action } from "@/actions/admin/update_user_balance";
import { ConvertInputCard } from "@/components/ConvertInputCard";
import { CTextField } from "@/components/CTextField";
import { MyCard } from "@/components/MyCard";
import { MyDialog } from "@/components/MyDialog";
import { Logo } from "@/components/shapes/logo";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import yup from "@/server/extra/yup";
import { main, WalletType } from "@app/dashboard/@modals/convert/ConvertModal";
import { CryptoConvertContext } from "@context/CryptoConvertContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, DropdownMenu, Flex, RadioCards, Separator, Switch, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InferAttributes } from "sequelize";
import { toast } from "sonner";
import { date } from "yup";

export default function AddTransactionDialog({ user, isOpen, setIsOpen }: { user: Users, isOpen: boolean, setIsOpen: (boolean) => void }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(yup.object({
            narration: yup.string().required(),
            type: yup.string().oneOf(['credit', 'debit']).required().default('credit'),
            status: yup.string().oneOf(['pending', 'completed']).required().default('completed'),
            beneficiaryName: yup.string().required(),
            date: yup.date().required().default(new Date()),
        }))
    });

    const [list, setList] = useState<WalletType[]>([]);
    const [sendFrom, setSendFrom] = useState<WalletType>(main(0));
    const [amount, setAmount] = useState<number>(0);
    const [selectedWallet, setSelectedWallet] = useState<InferAttributes<WalletBalances>>(null);

    var dropdownFrom: WalletType[] = user.walletBalances.map((e) => {
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

    function generateNarration() {
        var values = watch();
        var narration = "";

        if (values.type === 'credit') {
            if (sendFrom.value == -1) {
                narration += 'Transfer from ';
                narration += values.beneficiaryName;
            } else {
                narration += `${sendFrom.name} received from `;
                narration += values.beneficiaryName;
            }
        } else {
            if (sendFrom.value == -1) {
                narration += 'Transfer to ';
                narration += values.beneficiaryName;
            } else {
                narration += `${sendFrom.shortName} transfer to `;
                narration += values.beneficiaryName;
            }
        }

        setValue('narration', narration);
    }

    async function submit(data) {
        var values = data;
        if (amount == 0) {
            toast.error("Amount cannot be zero");
            return;
        }
        try {
            var res = await admin_add_transaction_action({
                narration: values.narration,
                amount: amount,
                userId: user.id,
                status: values.status,
                type: values.type,
                paymentMethod: sendFrom.type == 'fiat' ? "bank_transfer" : 'crypto',
                beneficiaryName: values.beneficiaryName,
                date: values.date,
                walletId: selectedWallet?.walletId ?? null
            });

            if (res.success) {
                toast.success(res.message);
                setIsOpen(false);
            } else {
                throw res;
            }
        } catch (error) {
            toast.error(res.error);
        }
    }

    useEffect(() => {
        var _wallet = user.walletBalances.find((e) => e.id == sendFrom.value);
        setSelectedWallet(_wallet);
    }, [sendFrom, isOpen])

    useEffect(() => {
        var list: WalletType[] = user.walletBalances.map((e) => {
            return {
                name: e.wallet.name,
                icon: e.wallet?.icon,
                value: e.id,
                type: e.wallet?.type,
                shortName: e.wallet.shortName
            }
        });

        setList(prev => [main(0), ...list]);
    }, [isOpen]);

    return (<
        MyDialog title={"Add Transaction"}
        description={""}
        open={isOpen}
        maxWidth="500px"
        setIsOpen={setIsOpen}
        trigger={<div></div>}
        children={
            <form onSubmit={handleSubmit(submit)} className="mt-7 w-full">
                <ConvertInputCard
                    inputProps={{
                        id: 'amount_input',
                        type: "number",
                        defaultValue: "0",
                        autoFocus: false,
                        onInput: (e) => {
                            handleOnInput(e)
                        }
                    }}
                    active={sendFrom}
                    subtitle={amount}
                    className={'!mt-0 mb-2'}
                    title="Amount"
                    placeholder="0"
                    currency={
                        {
                            name: sendFrom?.name,
                            icon: sendFrom?.icon,
                            onSelect: (v) => {
                                setSendFrom(v);
                            },
                            dropdown: [main(0), ...dropdownFrom]
                        }
                    }
                />

                <Flex direction="column" gap="4" className="mt-3 mb-1">
                    <RadioCards.Root columns="2" size={'1'} value={watch().type} defaultValue={'credit'}>
                        <RadioCards.Item onClick={() => setValue('type', 'credit')} value="credit">Credit</RadioCards.Item>
                        <RadioCards.Item onClick={() => setValue('type', 'debit')} value="debit">Debit</RadioCards.Item>
                    </RadioCards.Root>
                </Flex>

                <Flex direction="column" gap="4" className="mt-3 mb-1">
                    <RadioCards.Root columns="2" size={'1'} value={watch().status} defaultValue={'completed'}>
                        <RadioCards.Item onClick={() => setValue('status', 'completed')} value="completed">Completed</RadioCards.Item>
                        <RadioCards.Item onClick={() => setValue('status', 'pending')} value="pending">Pending</RadioCards.Item>
                    </RadioCards.Root>
                </Flex>

                <div className="gap-2 flex flex-col">

                    <CTextField
                        label={`Beneficiary Name (${watch().type ? "Sender" : "Receiver"})`}
                        placeholder="Beneficiary Name"
                        error={errors?.beneficiaryName?.message.toString()}
                        register={register("beneficiaryName")}
                    />
                    <CTextField
                        label="Date"
                        placeholder=""
                        type={'datetime-local'}
                        error={errors?.date?.message.toString()}
                        register={register("date")}
                    />
                    <CTextField
                        label="Narration"
                        placeholder="E.g Bank transfer from beneficiary name"
                        rightIcon={<Button type="button" onClick={() => generateNarration()}>Generate</Button>}
                        error={errors?.narration?.message.toString()}
                        register={register("narration")}
                    />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <Text as='div' size={'1'} trim={'both'}>Notify User (Email)</Text>
                    </div>
                    <Switch size={'1'} />
                </div>
                <div className="w-full">
                    <Button loading={isSubmitting} size={'3'} type="submit" className="mt-5 w-full">Submit</Button>
                </div>
            </form>
        }
    />);
}