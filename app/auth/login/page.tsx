"use client";

import {
  Flex,
  Button,
  Text,
  Card,
  Box,
  Link,
  Callout,
} from "@radix-ui/themes";
import { AuthContainerLogo } from "@/components/auth-container-logo";
import { MdLock, MdOutlineMailLock, MdRemoveRedEye } from "react-icons/md";
import { CTextField } from "@/components/text-field";
import { login } from "server/actions/auth/login";
import { useForm } from "react-hook-form";
import { TbInfoCircle } from "react-icons/tb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: zodResolver(loginActionScheme),
  });

  var router = useRouter();

  const submit = async (data: any) => {
    var res = await login(data);

    if (res.success) {
      toast.success(res.message);
      localStorage.setItem("user_id", JSON.stringify(res.user.id));
      localStorage.setItem("token", JSON.stringify(res.token));

      if (res.user.idDocStatus === null || res.user.ssnStatus === null) {
        router.push("/auth/verification");
      }
    } else {
      if (res.errors !== undefined)
        Object.entries(res.errors as any).forEach(([key, value]) => {
          setError(key as any, { type: "validate", message: value as any });
        });
    }
  };

  return (
    <Box
      maxWidth="300px"
      width={"300px"}
      className="m-auto sm:my-auto my-[30px]"
    >
      <Card variant={"surface"} className="py-4">
        <form onSubmit={handleSubmit(submit)}>
          <Flex gap="" direction={"column"} justify={"center"}>
            <Flex direction={"column"} align={"center"} justify={"center"}>
              <AuthContainerLogo />
              <Box height={"20px"} />
              <Text weight={"bold"}>Login to your account</Text>
              <Text color={"gray"} size={"1"}>
                Enter your details to login.
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
            <CTextField
              label="Email"
              placeholder="Enter your email"
              leftIcon={<MdOutlineMailLock />}
              error={errors?.email?.message}
              register={register("email")}
            />
            <Box height={"10px"} />
            <CTextField
              label="Password"
              placeholder="Enter your password"
              leftIcon={<MdLock />}
              rightIcon={<MdRemoveRedEye />}
              error={errors?.password?.message}
              register={register("password")}
            />
            <Box height={"10px"} />
            <Flex justify={"end"}>
              <Link
                size={"2"}
                href="/reset-password"
                weight={"medium"}
                underline={"always"}
              >
                Forgot Password?
              </Link>
            </Flex>
            <Box height={"20px"} />
            <Button
              type={"submit"}
              loading={isSubmitting}
              size="3"
              variant="solid"
            >
              Sign in
            </Button>
          </Flex>
        </form>
      </Card>
    </Box>
  );
}
