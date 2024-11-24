import { IconButton } from "@radix-ui/themes"
import { register } from "module"
import { TbSend2 } from "react-icons/tb"

export const ChatInput = (
    { onChanged, onSubmit, register }:
        { onChanged: any, onSubmit: any, register: any }
) => {
    return <div className="flex-grow bg-[--gray-1] flex items-center gap-3 pr-3 rounded-br-xl">
        <input onKeyUp={onChanged} type="text" className="h-[50px] text-wrap items-end bg-transparent shadow-none  w-full px-3 outline-0" placeholder="Type a message" {...register('message')} />
        <IconButton onClick={onSubmit} color="gray" variant="ghost">
            <TbSend2 color="white" size={20} />
        </IconButton>
    </div>
}