'use client';

import { change_password_action } from "@/actions/admin/change_password_action";
import { CTextField } from "@/components/CTextField";
import { MyDialog } from "@/components/MyDialog";
import { Users } from "@/database/models/users";
import logger from "@/lib/logger";
import yup from "@/server/extra/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordDialog({ user, isOpen, setIsOpen }: { user: Users, isOpen: boolean, setIsOpen: (boolean) => void }) {
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
            password: yup.string().required(),
        }))
    });

    async function submit(data) {
        var values = data;
        try {
            var res = await change_password_action({
                user_id: user.id,
                password: watch().password,
            });

            if (res.success) {
                toast.success(res.message);
                setIsOpen(false);
            } else {
                throw res;
            }
        } catch (error) {
            logger(error);
            toast.error(res.error);
        }
    }


    useEffect(() => {
        setValue('password', user.password);
    }, [isOpen]);

    return (<
        MyDialog title={"Change Password"}
        description={""}
        open={isOpen}
        maxWidth="500px"
        setIsOpen={setIsOpen}
        trigger={<div></div>}
        children={
            <form onSubmit={handleSubmit(submit)} className="w-full">
                <div className="gap-2 flex flex-col">
                    <CTextField
                        label={`Password`}
                        placeholder="Password"
                        error={errors?.password?.message.toString()}
                        register={register("password")}
                    />
                </div>
                <div className="w-full">
                    <Button loading={isSubmitting} size={'3'} type="submit" className="mt-5 w-full">Submit</Button>
                </div>
            </form>
        }
    />);
}