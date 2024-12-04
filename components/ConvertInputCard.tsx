import { DropdownMenu, Text } from "@radix-ui/themes";
import { InputHTMLAttributes } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MyCard } from "./MyCard";
import { Logo } from "./shapes/logo";
import Image from "next/image";
import { WalletType } from "@app/dashboard/@modals/ConvertModal";
import { cFmt } from "@/lib/cFmt";

export const ConvertInputCard = (props: {
    title: string,
    placeholder: string,
    onTapInput?: () => void,
    className?: any,
    inputProps?: InputHTMLAttributes<HTMLInputElement>,
    active?: WalletType,
    subtitle?: any,
    currency: {
        name: string,
        icon?: string,
        dropdown: WalletType[],
        onSelect?: (value?: WalletType) => void
    }
}) => {
    return <MyCard className={`mt-5 pb-2 pt-2 ${props.className}`}>
        <div className="flex flex-row items-center" >
            <div className="flex flex-col flex-grow">
                <div >
                    <Text size={'1'} color="gray">
                        {props.title}
                    </Text>
                </div>
                <input id="" onClick={props.onTapInput} onKeyUp={() => { }} type="text" className="mt-1 h-[20px] select-none text-[20px] text-wrap items-end bg-transparent shadow-none w-full outline-0" placeholder={props.placeholder} {...props.inputProps} />
                {props.subtitle && <Text className="text-[10px] text-primary-700">≈ {cFmt({amount: props.subtitle})}</Text>}
            </div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="cursor-pointer">
                    <div className="bg-[--gray-5] rounded-2xl px-2 py-1 flex items-center flex-row gap-2">
                        {props.currency.icon && <Image
                            className="my-auto rounded-full"
                            src={props.currency.icon ?? ""}
                            width={20}
                            height={20}
                            alt={"logo"}
                        />}
                        {props.active?.value == -1 && <Logo className={"h-[20px] w-[20px] fill-primary-700"} />}
                        <Text size={'1'}>{props.currency.name}</Text>
                        <MdArrowDropDown />
                    </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Group title="Wallet">
                        {props.currency.dropdown.map((e) =>
                            <DropdownMenu.CheckboxItem
                                key={e.value}
                                checked={props?.active?.value == e?.value}
                                onCheckedChange={(value) => {
                                    props.currency.onSelect(e);
                                }}
                            >
                                {e.icon && <Image
                                    className="my-auto rounded-full"
                                    src={e.icon ?? ""}
                                    width={20}
                                    height={20}
                                    alt={"logo"}
                                />}
                                {e.value == -1 && <Logo className={"h-[20px] w-[20px] fill-primary-700"} />}
                                {e.name}
                            </DropdownMenu.CheckboxItem>)}
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </MyCard>
}