import { useState } from "react";
import { toast } from "sonner";

export function CopyToClipboard(
    props
        : {
            text: any,
            type: 'text' | 'file',
            button?: any,
            successButton?: any
        }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(props.text);
            setIsCopied(true);
            toast.success("Copied to the clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy text");
            console.error("Failed to copy text:", err);
        }
    };

    return (
        <div
            onClick={handleCopy}
        >
            {isCopied ? (props.successButton ?? "Copied!") : (props.button ?? "Copy")}
        </div>

    );
}