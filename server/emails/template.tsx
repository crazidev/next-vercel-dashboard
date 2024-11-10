import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

export function EmailTemplate({ title, children }: { children: any, title: string }) {
    return <Card variant={"surface"}>
        <Flex direction={"column"} align={"center"} justify={"center"}>
            <AuthContainerLogo />
            <Box height={"20px"} />
            <Text weight={"bold"}>{title}</Text>
            {/* <Text color={"gray"} size={"1"}></Text> */}
        </Flex>
        <div className="mt-5">
            {children}
        </div>
    </Card>
}