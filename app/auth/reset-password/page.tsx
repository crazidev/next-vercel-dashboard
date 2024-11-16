"use client";

import {
  Flex,
  Button,
  Text,
  Card,
  Avatar,
  Box,
  TextField,
  Link,
  Callout,
} from "@radix-ui/themes";
import Image from "next/image";
import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import {
  MdBackHand,
  MdChevronLeft,
  MdCode,
  MdFlipToBack,
  MdLock,
  MdOutlineKeyboardAlt,
  MdOutlineMailLock,
  MdRemoveRedEye,
} from "react-icons/md";
import { CTextField } from "@/components/CTextField";
import { useActionState, useEffect, useState } from "react";
import { reset_password_action } from "@/actions/auth/reset_password";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/server/extra/yup";
import { TbInfoCircle } from "react-icons/tb";

export default function LoginPage() {
  var router = useRouter();
  const searchParams = useSearchParams();
  var action = searchParams.get('action');

  const [resetProgress, setResetProgress] = useState<
    "reset" | "verify" | "new_password"
  >((action as any) ?? "reset");


  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(yup.object(resetProgress === 'reset' ? {
      email: yup.string().email().required()
    } : {
      password: yup.string().min(6).required(),
      confirm_password: yup.string().min(6).required(),

    })),
  });



  const submit = async (data: any) => {
    var res = await reset_password_action({ ...data, action: resetProgress, token: searchParams.get('token'), email2: searchParams.get('email') });

    console.log(res);

    if (res.success) {
      toast.success(res.message);
      if (res.action == 'reset') {
        setResetProgress('verify');
      }

      // LOGIN AFTER PASSWORD RESET
      if (res.action == 'new_password') {
        if (res.success && res.user != undefined) {
          localStorage.setItem("user_id", JSON.stringify(res.user.id));
          localStorage.setItem("token", JSON.stringify(res.token));
          if (res.user.idDocStatus === null || res.user.ssnStatus === null) {
            router.push("/auth/verification");
          } else {
            router.push("/dashboard");
          }
        }
      }
    } else {
      if (res.errors !== undefined)
        Object.entries(res.errors as any).forEach(([key, value]) => {
          setError(key as any, { type: "validate", message: value as any });
        });

      if (errors.root?.message?.includes('invalid')) {
        setResetProgress('reset');
      }
    }
  };

  return (
    <Box
      maxWidth="300px"
      width={"300px"}
      className="m-auto my-[30px] sm:my-auto"
    >
      <Card variant={"surface"} className="py-4">
        <Link size={"1"} onClick={() => {
          if (resetProgress !== 'reset') {
            setResetProgress('reset');
          } else {
            router.push('/auth/login');
          }
        }} className="flex flex-row items-center gap-1 cursor-pointer">
          <MdChevronLeft /> {resetProgress === 'reset' ? 'Login' : 'Reset'}
        </Link>
        <form onSubmit={handleSubmit(submit)}>
          <Flex gap="" direction={"column"} justify={"center"}>
            <Flex direction={"column"} align={"center"} justify={"center"}>
              <AuthContainerLogo />
              <Box height={"20px"} />
              <Text weight={"bold"}>
                {(() => {
                  switch (resetProgress) {
                    case "reset":
                      return "Reset Password";

                    case "verify":
                      return "Verify Email";

                    case "new_password":
                      return "New Password";
                  }
                })()}
              </Text>
              <Text color={"gray"} size={"1"} align={"center"}>
                {(() => {
                  switch (resetProgress) {
                    case "reset":
                      return "A reset password link will be sent to your email address.";

                    case "verify":
                      return ``;

                    case "new_password":
                      return "Create a safe secure password you can remember.";
                  }
                })()}
              </Text>
            </Flex>
            {errors.root && (
              <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                <Callout.Icon>
                  <TbInfoCircle />
                </Callout.Icon>
                <Callout.Text>{errors.root.message}</Callout.Text>
              </Callout.Root>
            )}
            <Box height={"10px"} />
            {(() => {
              switch (resetProgress) {
                case "reset":
                  return (
                    <CTextField
                      label="Email"
                      placeholder="Enter your email address"
                      type="email"
                      inputMode="email"
                      leftIcon={<MdOutlineMailLock />}
                      error={errors?.email?.message}
                      register={register("email")}
                    />
                  );

                case "verify":
                  return (
                    <Text size={'1'} align={'center'}>
                      A password reset has been sent to {" "}
                      <Text className="!text-primary-500">{getValues('email') as any}</Text>
                      .</Text>

                  );

                case "new_password":
                  return (
                    <Flex direction={"column"} gap={"3"}>
                      <CTextField
                        label="New Password"
                        placeholder="******"
                        type="password"
                        inputMode={"text"}
                        leftIcon={<MdLock />}
                        error={errors?.password?.message}
                        register={register("password")}
                      />
                      <CTextField
                        label="Confirm Password"
                        placeholder="******"
                        type="password"
                        inputMode={"text"}
                        leftIcon={<MdLock />}
                        error={errors?.confirm_password?.message}
                        register={register("confirm_password")}
                      />
                    </Flex>
                  );
              }
            })()}

            <Box height={"10px"} />

            <Box height={"20px"} />
            {resetProgress !== 'verify' &&
              <Button size="3" variant="solid" loading={isSubmitting} type={'submit'}>
                {(() => {
                  switch (resetProgress) {
                    case "reset":
                      return "Reset Password";

                    case "new_password":
                      return "Submit";
                  }
                })()}
              </Button>}
          </Flex>
        </form>
      </Card>
    </Box>
  );
}

