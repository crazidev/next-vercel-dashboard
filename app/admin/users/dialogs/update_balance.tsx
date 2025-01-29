'use client';

import { ConvertInputCard } from "@/components/ConvertInputCard";
import { MyCard } from "@/components/MyCard";
import { MyDialog } from "@/components/MyDialog";
import { Logo } from "@/components/shapes/logo";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { main, WalletType } from "@app/dashboard/@modals/convert/ConvertModal";
import { CryptoConvertContext } from "@context/CryptoConvertContext";
import { Button, DropdownMenu, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import { InferAttributes } from "sequelize";

export default function UpdateBalanceDialog({ user, isOpen, setIsOpen }: { user: Users, isOpen: boolean, setIsOpen: (boolean) => void }) {

    const [list, setList] = useState<WalletType[]>([]);
    const [sendFrom, setSendFrom] = useState<WalletType>(main(0));
    const [selectedWallet, setSelectedWallet] = useState<InferAttributes<WalletBalances>>(null);
    const [fiat, setFiat] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [isSuccessful, setSuccessful] = useState(null);
    const convert = useContext(CryptoConvertContext);
    const [error, setBError] = useState<string>(null);

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

    function calculateFiat() {
        if (sendFrom.type == 'crypto' && convert?.convert?.isReady == true) {
            var _inputFiat = convert.convert[sendFrom?.shortName ?? "USD"]['USD'](amount);
            setFiat(_inputFiat);
        } else {
            setFiat(amount);
        }
    }

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

    useEffect(() => {
        var _wallet = user.walletBalances.find((e) => e.id == sendFrom.value);
        setSelectedWallet(_wallet);
        if (typeof document === "undefined") return;
        if (document.getElementById('amount_input') != null) {
            if (_wallet) {
                document.getElementById('amount_input').value = _wallet?.balance ?? 0;
                setAmount(_wallet.balance ?? 0);
            } else if (sendFrom.value == -1) {
                document.getElementById('amount_input').value = user?.accountBalance ?? 0;
                setAmount(user?.accountBalance ?? 0);
            }
        }

        calculateFiat();
    }, [sendFrom, isOpen]);

    useEffect(() => {
        calculateFiat();
        setBError(null);
    }, [amount, sendFrom]);

    return (<
        MyDialog title={"Update Balance"}
        description={""}
        open={isOpen}
        maxWidth="500px"
        setIsOpen={setIsOpen}
        trigger={<div></div>}
        children={
            <div>
                <div className="flex mt-7 gap-5">
                    <div className="w-[30%] mobile:w-fit tablet:w-fit flex flex-col gap-2">
                        <div className="flex flex-col">
                            {list.map((e) =>
                                <div key={e.value} onClick={(i) => setSendFrom(e)}>
                                    <MyCard size={'1'} className={`px-2 h-auto py-2 outline-0 flex flex-row items-center gap-2 cursor-pointer font-bold ${(sendFrom.value == e.value) ? "!bg-[--accent-5] border-2 border-[--accent-5]" : "!bg-transparent"}`}>
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
                            )}</div>
                    </div>
                    <div className="">
                        <Separator orientation={'vertical'} className="h-full" />
                    </div>
                    <div>
                        <ConvertInputCard
                            inputProps={{
                                id: 'amount_input',
                                type: "number",
                                defaultValue: user.accountBalance,
                                autoFocus: false,
                                // onFocus: (e) => setActiveInput('input_1'),
                                onInput: (e) => {
                                    handleOnInput(e)
                                }
                            }}
                            active={sendFrom}
                            subtitle={fiat}
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
                        <div className="w-full">
                            <Button loading={false} size={'3'} onClick={() => { }} className="mt-5 w-full">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        }
    />);
}