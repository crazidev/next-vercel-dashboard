import { MyCard } from "@/components/MyCard";
import { Box, Button, Flex, Heading, Separator, Text, ThickDividerHorizontalIcon } from "@radix-ui/themes";
import { TierCardList } from "@/components/TierCardList";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";

export default async function AccountTiersPage() {
    var user_id = (await authUser()).user_id;
    var user = await fetchUser(user_id);

    return (
        <Flex direction="column" align="center" className="pb-10">
            {/* Center Title */}
            <Heading size="7" align="center" className="mb-2 font-bold">
                Your Account Tier
            </Heading>

            {/* Subtitle */}
            <Text size="2" align="center" color="gray" className="mb-10">
                Select the best account option for your financial needs. Each tier offers unique benefits, limits, and requirements.
            </Text>

            <TierCardList user={user} />
        </Flex>
    );
}
