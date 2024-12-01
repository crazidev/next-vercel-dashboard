import { IconButton } from "@radix-ui/themes"
import { LucideEyeOff, LucideEye } from "lucide-react"

export function PasswordToggler({
    onChange,
    visible
}: {
    onChange: () => void,
    visible: boolean
}) {
    return <IconButton type="button" variant="ghost" size={'1'} onClick={onChange}>
        {visible ? <LucideEyeOff size={15} /> : <LucideEye size={15} />}
    </IconButton>
}