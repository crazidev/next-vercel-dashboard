import { Heading, Text } from "@radix-ui/themes";
import { LuCreditCard } from "react-icons/lu";
import { NavBar } from "../../../components/NavBar";
import { TbCreditCard } from "react-icons/tb";

export default function CardPage() {
    return <div className="flex flex-row flex-grow gap-5">
        <div className="flex flex-col flex-grow flex-[9] w-[100%]">
            <NavBar title="Debit/Virtual Cards" description="Create & Manage your Debit/Virtual cards sinlessly." />

            <div className="flex justify-center flex-col items-center w-full text-center h-full gap-2">
                <TbCreditCard size={80} className="text-primary-500 "/>
                <div>
                    <Heading weight={'bold'} size={'3'}>Not available in this region yet.</Heading>
                    <Text  as={'div'} size={'1'}>Contact our support for enquires or help.</Text>
                </div>
            </div>
        </div>
    </div>

}