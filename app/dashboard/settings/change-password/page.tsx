'use client';

import { useState, useEffect, useContext } from "react";
import { MyCard } from "@/components/MyCard";
import { Box, Button, Callout, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import password_illu from "../../../../public/my-password-illu.svg";
import Image from "next/image";
import * as yup from "yup";
import { CTextField } from "@/components/CTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdLock } from "react-icons/md";
import { TbInfoCircle } from "react-icons/tb";
import { PasswordValidator } from "@/components/PasswordValidator";
import { toast } from "sonner";
import { changePasswordAction } from "./action/change-password";
import { LucideEyeOff, LucideEye } from "lucide-react";
import { PasswordToggler } from "@/components/PasswordToggler";
import { motion } from "motion/react";
import { DashboardContext } from "app/dashboard/providers";

export default function ProfilePage() {

    // Form handling with react-hook-form and yup validation
    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        resolver: yupResolver(
            yup.object({
                current_password: yup.string()
                    .required('Current password is required'),
                password: yup
                    .string()
                    .min(6, "Password must be at least 6 characters long")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/\d/, "Password must contain at least one number")
                    .matches(/[\W_]/, "Password must contain at least one special character (e.g., !@#$%^&*)")
                    .required("Password is required"),
                confirm_password: yup
                    .string()
                    .required("Confirm password is required")
                    .oneOf([yup.ref("password"), ''], "Passwords must match"),
            })
        ),
    });



    async function submit(data: any) {
        var res = await changePasswordAction(data);

        if (res.success) {
            toast.success(res.message);
            reset();
        } else {
            if (res.errors !== undefined)
                Object.entries(res.errors as any).forEach(([key, value]) => {
                    setError(key as any, { type: "validate", message: value as any });
                });
        }
    }


    const formValues = watch();
    const [showPass, setShowPass] = useState(false);
    var dashContext = useContext(DashboardContext);

    return (
        <form onSubmit={handleSubmit(submit)} className="relative">
            <div className={"fixed bottom-0 shadow-2xl light:bg-primary-100 dark:shadow-[var(--gray-a3)] shadow-[var(--accent-a6)]  animate-spin-slow right-[-100px] w-[300px] h-[300px]"} />

            <MyCard className="py-10 w-full">
                <motion.div layout className="flex sm:flex-row flex-col-reverse" style={{}}>
                    <Flex direction={"column"} className="flex-1 justify-between md:max-w-[350px]">
                        {errors.root && (
                            <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                                <Callout.Icon>
                                    <TbInfoCircle />
                                </Callout.Icon>
                                <Callout.Text>{errors.root.message}</Callout.Text>
                            </Callout.Root>
                        )}
                        <Box height={"10px"} />
                        <Flex direction={"column"} gap={"3"}>
                            <CTextField
                                label="Current Password"
                                placeholder="******"
                                inputMode={"text"}
                                leftIcon={<MdLock />}
                                type={showPass ? 'text' : 'password'}
                                rightIcon={<PasswordToggler visible={showPass} onChange={() => setShowPass(!showPass)} />}
                                error={errors?.current_password?.message}
                                register={register("current_password")}
                            />

                            <CTextField
                                label="New Password"
                                placeholder="******"
                                type={showPass ? 'text' : 'password'}
                                inputMode={"text"}
                                leftIcon={<MdLock />}
                                error={errors?.password?.message}
                                register={register("password")}
                            />

                            <CTextField
                                label="Confirm Password"
                                placeholder="******"
                                type={showPass ? 'text' : 'password'}
                                inputMode={"text"}
                                leftIcon={<MdLock />}
                                error={errors?.confirm_password?.message}
                                register={register("confirm_password")}
                            />
                            <PasswordValidator password={formValues.password} isTouched={true} />
                        </Flex>
                        <Box height={"20px"} />
                        <Button size="3" variant="solid" loading={isSubmitting} type={'submit'}>
                            Submit
                        </Button>
                    </Flex>

                    <Flex direction={"column"} align={"center"} className="flex-1 gap-2 px-5">
                        <motion.div initial={{
                            scale: 0
                        }}
                            animate={{
                                scale: 1
                            }}
                            transition={{
                                duration: 0.3,
                            }}>
                            <Image className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" src={password_illu} width={150} height={150} alt="my-password" />
                            <Box height={"20px"} />
                        </motion.div>
                        <motion.div initial={{
                            x: 50
                        }}
                            animate={{
                                x: 0
                            }}
                            transition={{
                                duration: 0.3,
                            }}>
                            <Heading>
                                Secure Your Account
                            </Heading>
                        </motion.div>
                        <motion.div initial={{
                            x: 100
                        }}
                            animate={{
                                x: 0
                            }}
                            transition={{
                                duration: 0.2,
                            }}>
                            <Text align={'center'} size={'1'} color="gray">
                                Choose a strong, unique password to enhance the security of your account.
                            </Text>
                        </motion.div>
                    </Flex>
                </motion.div>
            </MyCard>
        </form>
    );
}
