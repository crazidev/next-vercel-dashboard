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
  RadioCards,
  Callout,
} from "@radix-ui/themes";
import Image from "next/image";
import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import {
  MdLocationPin,
  MdLock,
  MdOutlineMailLock,
  MdPerson,
  MdPhone,
  MdRemoveRedEye,
} from "react-icons/md";
import { CTextField } from "@/components/CTextField";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register_action } from "@/actions/auth/register_action";
import { TbCalendar, TbInfoCircle } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PasswordValidator } from "../components/PasswordValidator";

export default function RegisterPage() {
  var router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, },
  } = useForm({
    // resolver: zodResolver(RegisterScheme),
  });

  const formValues = watch();


  const submit = async (data: any) => {
    var res = await register_action(data);

    if (res.success) {
      toast.success(res.message);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', JSON.stringify(res.token));
      router.push('verification', {
        
      });
    } else {
      if (res.errors !== undefined)
        Object.entries(res?.errors as any).forEach(([key, value]) => {
          setError(key as any, { type: "validate", message: value as any });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box className="m-auto sm:my-auto my-[30px] max-w-[400px] w-full md:w-[350px]">
        <Card variant={"surface"} className="py-4">
          <Flex gap="" direction={"column"} justify={"center"}>
            <Flex direction={"column"} align={"center"} justify={"center"}>
              <AuthContainerLogo />
              <Box height={"20px"} />
              <Text weight={"bold"}>Create a new account</Text>
              <Text color={"gray"} size={"1"}>
                Enter your details to register.
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
            <Flex gapX={"3"}>
              <CTextField
                label="First name"
                placeholder="Fist name"
                leftIcon={<MdPerson />}
                register={register("first_name")}
                error={errors?.first_name?.message}
              />
              <CTextField
                label="Last name"
                placeholder="Last name"
                leftIcon={<MdPerson />}
                register={register("last_name")}
                error={errors?.last_name?.message}
              />
            </Flex>
            <Box height={"10px"} />
            <CTextField
              label="Email"
              placeholder="Enter your email"
              leftIcon={<MdOutlineMailLock />}
              register={register("email")}
              error={errors?.email?.message}
            />
            <Box height={"10px"} />
            <CTextField
              label="Phone Number"
              placeholder="+1 000 000 000"
              leftIcon={<MdPhone />}
              register={register("phone")}
              error={errors?.phone?.message}
            />
            <Box height={"10px"} />
            <CTextField
              label="Date of birth"
              placeholder="01/01/1990"
              leftIcon={<TbCalendar />}
              type={"date"}
              register={register("dob")}
              error={errors?.dob?.message}
            />
            <Box height={"20px"} />
            <Box>
              <RadioCards.Root
                size="1"
                defaultValue="male"
                columns={{ initial: "2", sm: "2" }}
                {...register("gender")}
                onChange={(e) => {
                  setValue("gender", (e.target as any).value);
                }}
              >
                <RadioCards.Item value="male" className="h-[35px]">
                  <Text weight="bold">Male</Text>
                </RadioCards.Item>
                <RadioCards.Item value="female" className="h-[35px]">
                  <Text weight="bold">Female</Text>
                </RadioCards.Item>
              </RadioCards.Root>
            </Box>
            <Box height={"10px"} />
            <CTextField
              label="Password"
              placeholder="Enter your password"
              leftIcon={<MdLock />}
              rightIcon={<MdRemoveRedEye />}
              register={register("password")}
              error={errors?.password?.message}
            />
            <PasswordValidator password={formValues.password} isTouched={true} />

            <Box height={"20px"} />
            <Button
              size="3"
              variant="solid"
              type={"submit"}
              loading={isSubmitting}
            >
              Sign Up
            </Button>
          </Flex>
        </Card>
      </Box>
    </form>
  );
}
