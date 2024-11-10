import { Button, Text } from "@radix-ui/themes";
import { EmailTemplate } from "./template";

export const ResetPasswordMail = ({ link }: { link: string }) => {
    return <EmailTemplate title="Reset Password">
        <Text>Seems like your forgot your password. if this is true, click on the button below to reset your password.</Text>
        <a href={link} target="_blank" className="my-5">
            <Button>Reset Password</Button>
        </a>
        <Text>If you did not forgot your password, you can safely ignore this email.</Text>
    </EmailTemplate>;
};