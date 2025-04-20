import { IconButton } from "@radix-ui/themes"
import { LucideEyeOff, LucideEye } from "lucide-react"

export function PasswordToggler({
    onChange,
    visible
}: {
    onChange: () => void,
    visible: boolean
}) {
    return <IconButton type="button" className="text-[12px]" variant="ghost" size={'1'} onClick={onChange}>
        {!visible ? 'Show' : 'Hide'}
    </IconButton>
}