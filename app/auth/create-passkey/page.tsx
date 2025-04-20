"use client";

import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import {
    Card,
    Box,
    Callout,
    Flex,
    Text,
    Button,
} from "@radix-ui/themes";

import { useRouter } from "next/navigation";
import { TbInfoCircle } from "react-icons/tb";
import PasskeySvg from '@public/passkey-illustration.svg';
import Image from "next/image";
import { server, client } from '@passwordless-id/webauthn'
import { generateRandomChallenge, savePasskey } from "@/actions/auth/login";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";
import { Users } from "@/database/models/users";

export default function CreatePasskeyPage() {
    var router = useRouter();
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    var user: any;

    const saveWithPasskey = async () => {
        setError(undefined);
        setIsLoading(true);
        var user_id = (await authUser()).user_id;
        user = await fetchUser(user_id);

        if (user == undefined) {
            router.push("/auth/login");
            return;
        }

        if (saved && user) {
            redirect();
            return;
        }

        try {

            const challenge = await generateRandomChallenge();
            const registration = await client.register({
                user: {
                    name: `${user?.email}`,
                    displayName: `${user?.email}`,
                    id: `${user?.email}_${user_id}`
                },
                userVerification: 'preferred',
                challenge: challenge,
            });

            var data = {
                id: registration.id,
                publicKey: registration.response.publicKey,
                transports: registration.response.transports,
                user_id: user.id
            }

            console.log(data)

            try {
                var res = await savePasskey(data);
                setSaved(res as boolean);
                setIsLoading(false);
            } catch (err: any) {
                setError(err);
                console.error("savePasskey error:", err)
                setIsLoading(false);
            }

        } catch (err: any) {
            console.error(err)
            setIsLoading(false);
        }
    }

    async function redirect() {
        setIsLoading(true);
        var user_id = (await authUser()).user_id;
        user = await fetchUser(user_id);

        setIsLoading(false);
        if (!user) {
            router.push("/auth/login");
        } else {
            if (user?.idDocStatus === null || user?.ssnStatus === null) {
                router.push("/auth/verification");
            } else {
                router.push("/dashboard");
            }
        }
    }

    return (
        <Box
            maxWidth="300px"
            width={"300px"}
            className="m-auto my-[30px] sm:my-auto"
        >
            <Card variant={"surface"} className="py-4">
                <Flex direction={"column"} align={"center"} justify={"center"}>
                    <AuthContainerLogo />
                    <Box height={"20px"} />
                    <Text weight={"bold"}>{saved ? 'Passkey created successfully' : 'Simplify your sign-in'}</Text>

                </Flex>
                {error && (
                    <Callout.Root variant="surface" color="red" mt={"5"} size={"1"}>
                        <Callout.Icon>
                            <TbInfoCircle />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )}
                <Box height={"20px"} />
                <Image
                    priority
                    src={PasskeySvg}
                    height={200}
                    width={200}
                    alt=""
                    className="mx-auto"
                />
                <Box height={"20px"} />
                <Text color={"gray"} as={'div'} size={"1"} className="text-center mx-auto capitalize">
                    {!saved && 'With passkey '}you can now use your fingerprint, face, or screen lock to verify it's really you.
                </Text>
                <Box height={"30px"} />
                <Flex justify={'end'} gap={'6'} align={'center'}>
                    {!saved && <Button variant="ghost" size={'1'} radius="full" onClick={redirect}>
                        Not now
                    </Button>}
                    <Button className="px-[30px]" loading={isLoading} onClick={saveWithPasskey} variant="solid" size={'2'} radius="full">
                        {saved ? "Proceed" : "Try it"}
                    </Button>
                </Flex>


                <Box height={"10px"} />
                {/* <Link size={"1"} onClick={() => {
          if (resetProgress !== 'reset') {
            setResetProgress('reset');
          } else {
            router.push('/auth/login');
          }
        }} className="flex flex-row items-center gap-1 cursor-pointer">
          <MdChevronLeft /> {resetProgress === 'reset' ? 'Login' : 'Reset'}
        </Link> */}

            </Card>
        </Box>
    );
}

