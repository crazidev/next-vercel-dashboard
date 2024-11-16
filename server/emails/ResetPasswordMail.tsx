import { EmailTemplate } from "./EmailTemplate";

export const ResetPasswordMail = ({ link }: { link: string }) => {    
    return <EmailTemplate title="Reset Password">
        <div className="flex flex-col gap-2 items-center text-justify">
            <div className="">Seems like your forgot your password. if this is true, click on the button below to reset your password.</div>
            <a href={link} target="_blank" className="my-5">
                <button className="bg-primary-500/10 px-3 font-bold py-2 border border-primary/10 border-solid rounded-md text-primary">Reset Password</button>
            </a>
            <div className="text-[12px] text-gray">If you did not forgot your password, you can safely ignore this email.</div>
        </div></EmailTemplate>;
};

export default ResetPasswordMail;