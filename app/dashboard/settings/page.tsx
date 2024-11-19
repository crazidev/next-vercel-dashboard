import { MyCard } from "@/components/MyCard";
import { Avatar, Badge, DataList, Flex, Heading, HoverCard, Link, Text } from "@radix-ui/themes";
import { authUser } from "@/actions/authUser";
import { Users } from "@/database/models/users";
import { fetchUser } from "@/fetch/fetch_user";

export default async function ProfilePage() {
    var user_id = (await authUser()).user_id;
    var user = await fetchUser(user_id);

    return <div className="flex flex-col gap-5">
        <MyCard>
            <div>
                <Flex className="gap-3 items-center">
                    <Avatar fallback={user?.firstName.at(0) ?? "A"} radius="full" size={'5'} />
                    <div>
                        <Flex gap={'2'}>
                            <Text as={'div'} weight={'bold'}>
                                {user?.firstName}{" "} {user?.lastName}

                            </Text>
                            <Badge
                                className="text-[10px] capitalize"
                                color="green"
                                radius="large"
                            >
                                {user?.status}
                            </Badge>
                            <Badge className="text-[10px]" color="blue" radius="large">
                                {user?.accountLevel == "tier1" && "Savings Account"}
                                {user?.accountLevel == "tier2" && "Business Account"}
                                {user?.accountLevel == "tier3" && "Enterprise Account"}
                            </Badge>
                        </Flex>

                        <Link>
                            <Text color='gray' size='1' as={'div'}>
                                {user?.email}
                            </Text>
                        </Link>
                        <Flex gap={'2'} className="mt-[7px]">
                            <Text color='gray' size='1'>
                                SSN:
                            </Text>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Text size='1'>
                                        {user?.ssn}
                                    </Text>
                                </HoverCard.Trigger>
                                <HoverCard.Content maxWidth="300px">

                                </HoverCard.Content>
                            </HoverCard.Root>{" "}
                        </Flex>
                    </div>
                </Flex>
            </div>
        </MyCard>
        <MyCard>
            <div>
                <Heading>Personal Information</Heading>
                <Flex gap={'9'} className="mt-[30]">
                    <DataList.Root trim={'both'} size={'1'} orientation="vertical">
                        <DataList.Item>
                            <DataList.Label>First Name</DataList.Label>
                            <DataList.Value>{user?.firstName}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Email</DataList.Label>
                            <DataList.Value>{user?.email}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Gender</DataList.Label>
                            <DataList.Value>{user?.gender}</DataList.Value>
                        </DataList.Item>

                    </DataList.Root>
                    <DataList.Root trim={'both'} size={'1'} orientation="vertical">
                        <DataList.Item>
                            <DataList.Label>Last Name</DataList.Label>
                            <DataList.Value>{user?.lastName}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label >Phone</DataList.Label>
                            <DataList.Value>{user?.phone}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Date of birth</DataList.Label>
                            <DataList.Value>{user?.dateOfBirth}</DataList.Value>
                        </DataList.Item>

                    </DataList.Root>
                </Flex>
            </div>
        </MyCard>
        <MyCard>
            <div>
                <Heading>Address Information</Heading>
                <Flex gap={'9'} className="mt-[30]">
                    <DataList.Root trim={'both'} size={'1'} orientation="horizontal">
                        <DataList.Item>
                            <DataList.Label>Country</DataList.Label>
                            <DataList.Value>{user?.country}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>State/Region</DataList.Label>
                            <DataList.Value>{user?.state}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Address</DataList.Label>
                            <DataList.Value>{user?.address}</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Flex>
            </div>
        </MyCard>
    </div>
}