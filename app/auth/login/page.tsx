"use client";

import { Flex, Button, Text, Card, Box, Link, Callout, IconButton } from "@radix-ui/themes";
import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import { MdLock, MdOutlineMailLock, MdRemoveRedEye } from "react-icons/md";
import { CTextField } from "@/components/CTextField";
import { useForm } from "react-hook-form";
import { TbEye, TbEyeCancel, TbFaceId, TbFingerprint, TbInfoCircle, TbLockAccess } from "react-icons/tb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordToggler } from "../components/PasswordToggler";
import { checkGoogleAuthLogin, checkPasskey, generateRandomChallenge, login } from "@/actions/auth/login";
import { client, server } from "@passwordless-id/webauthn";
import { Separator } from "@/components/ui/separator";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { appClient } from "@/server/extra/firebase";

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
  const [showPass, setShowPass] = useState(false);


  const submit = async (data: any) => {
    var res = await login(data);

    if (res.success) {
      toast.success(res.message);
      localStorage.setItem("user_id", JSON.stringify(res.user.id));
      localStorage.setItem("token", JSON.stringify(res.token));

      if (!res.hasPasskey) {
        router.push("/auth/create-passkey");
      } else if (res.user.idDocStatus === null || res.user.ssnStatus === null) {
        router.push("/auth/verification");
      } else {
        router.push("/dashboard");
      }
    } else {
      if (res.errors !== undefined)
        Object.entries(res.errors as any).forEach(([key, value]) => {
          setError(key as any, { type: "validate", message: value as any });
        });
    }
  };

  const loginWithPasskey = async () => {
    const challenge = await generateRandomChallenge();

    const authentication = await client.authenticate({
      challenge: challenge,
      userVerification: 'preferred',
      // allowCredentials: ['crazibeat-01'],
    });

    const res = await checkPasskey({ authentication: authentication, challenge: challenge });

    if (res !== undefined && res.success) {
      toast.success(res.message);
      localStorage.setItem("user_id", JSON.stringify(res.user?.id));
      localStorage.setItem("token", JSON.stringify(res.token));

      if (res.user?.idDocStatus === null || res.user?.ssnStatus === null) {
        router.push("/auth/verification");
      } else {
        router.push("/dashboard");
      }
    } else {
      toast.error(res.errors.root);
    }
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(appClient);

    try {
      var result = await signInWithPopup(auth, provider);

      var res = await checkGoogleAuthLogin(result.user.email!);

      if (res !== undefined && res.success) {
        toast.success(res.message);
        localStorage.setItem("user_id", JSON.stringify(res.user?.id));
        localStorage.setItem("token", JSON.stringify(res.token));

        if (res.user?.idDocStatus === null || res.user?.ssnStatus === null) {
          router.push("/auth/verification");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(res.message);
      }

    } catch (error: any) {
      // const errorCode = error.code;
      // const email = error.customData.email;
      const errorMessage = error?.message;
    }
  };

  return (
    <Box
      maxWidth="300px"
      width={"300px"}
      className="m-auto my-[30px] sm:my-auto"
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
              autoComplete="Crazibeat webauthn"
              leftIcon={<MdOutlineMailLock />}
              error={errors?.email?.message}
              register={register("email")}
            />
            <Box height={"10px"} />
            <CTextField
              label="Password"
              placeholder="Enter your password"
              leftIcon={<MdLock />}
              autoComplete="current-password"
              rightIcon={<PasswordToggler visible={showPass} onChange={() => setShowPass(!showPass)} />}
              error={errors?.password?.message}
              register={register("password")}
            />
            <Box height={"10px"} />
            <Flex justify={"end"}>
              <Link
                size={"2"}
                href="/auth/reset-password"
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
          <Box height={"10px"} />
          <Flex align={'center'} direction={'column'}>
            <Link onClick={loginWithGoogle}>Sign in with Google</Link>
            {/* <Link onClick={loginWithPasskey}>Sign in with Passkey</Link> */}
          </Flex>
        </form>
      </Card>
    </Box>
  );
}
