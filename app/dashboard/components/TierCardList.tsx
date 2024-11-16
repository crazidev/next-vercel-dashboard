'use client';

import { Flex, Button } from "@radix-ui/themes";
import { Box, Heading, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useState } from "react";
import { DashboardContext } from "../providers";

export function TierCardList() {
    const tiers = [
        {
            name: "Savings",
            description: "Ideal for personal use with basic banking features.",
            interest: {
                percent: 0,
                desc: 'Monthly interest\nof total balance'
            },
            requirements: ["SSN", "ID Card", "Address Verification"],
            limits: [
                "Daily Transfer Limit: $500",
                "Receive Limit: $1,000",
                "Balance Limit: $5,000"
            ],
            benefits: ["Linking bank card", "Option to purchase our debit card"],
            buttonText: "Open Tier 1 Account",
            color: "text-green-600",
            cardStyle: "hover:to-[--gray-a3] hover:from-[--green-a1] from-[--gray-a3] to-[--green-a1]",
        },

        {
            name: "Enterprise",
            description: "Perfect for enterprises and organizations with high transaction needs.",
            interest: {
                percent: 9.2,
                desc: 'Monthly interest\nof total balance'
            },
            requirements: ["SSN", "ID Card", "Address Verification", "Income Verification"],
            limits: [
                "Daily Transfer Limit: $10,000",
                "Receive Limit: $50,000",
                "No Balance Limit"
            ],
            benefits: [
                "All Tier 2 features",
                "Dedicated account manager",
                "Priority customer support",
                "Customizable account options"
            ],
            buttonText: "Contact for Tier 3",
            color: "text-blue-700",
            cardStyle: "hover:to-[--gray-a3] hover:from-[--blue-a1] from-[--gray-a3] to-[--blue-a1]",
        },
        {
            name: "Business",
            description: "Designed for small businesses with extended limits and features.",
            interest: {
                percent: 5.2,
                desc: 'Monthly interest\nof total balance'
            },
            requirements: ["SSN", "ID Card", "Address Verification"],
            limits: [
                "Daily Transfer Limit: $2,000",
                "Receive Limit: $5,000",
                "Balance Limit: $20,000"
            ],
            benefits: [
                "8% monthly interest on balance",
                "All Tier 1 features"
            ],
            buttonText: "Open Tier 2 Account",
            color: "text-purple-700",
            cardStyle: "hover:to-[--gray-a3] hover:from-[--purple-a1] from-[--gray-a3] to-[--purple-a1]",
        },
    ];

    var dashContext = useContext(DashboardContext);
    const [isOpen, setIsOpen] = useState(false);

    return <motion.div layout transition={{
        duration: 0.5
    }} className="gap-5 items-center justify-center" style={{
        display: 'flex',
        flexDirection: !(dashContext.isTablet || dashContext.isMobile) ? 'row' : 'column'
    }}>

        {tiers.map((tier, i) => (
            <motion.div key={tier.name}
                initial={{
                    y: 100
                }}
                animate={{
                    y: 0
                }}
                transition={{
                    duration: 0.5,
                    type: 'spring',
                    delay: i * 0.06
                }}
            >

                <Box

                    className={`bg-gradient-to-tl max-h-fit max-w-[320px] w-full p-5 rounded-lg shadow-0 transition-all transform flex flex-col justify-between lg:hover:scale-105 duration-300 ${tier.cardStyle}`}
                    style={{ flex: "1 1 30%" }}
                >
                    <div>

                        <Heading size="5" align="left" className={`font-mono ${tier.color}`}>
                            {tier.name}
                        </Heading>
                        <Text color="gray" size={"1"} as={'div'} className="mb-4">{tier.description}</Text>
                        <Flex gap={'3'} className="my-4 items-end">
                            <Flex gap={'0'}>
                                <Text size={'1'} wrap={"wrap"}>%</Text>
                                <Heading trim={'both'} size={'9'} className={`${tier.color}`}>{tier.interest.percent}</Heading>
                            </Flex>
                            <Text size={'1'} color={'gray'} wrap={"pretty"} className="max-w-[100px]">{tier.interest.desc}</Text>
                        </Flex>

                        {/* Requirements */}
                        <Text size="1" align="center" className={`my-4 font-bold ${tier.color}`}>
                            Requirements
                        </Text>
                        <Flex className="horizontal-list mb-4 gap-2 flex-wrap">
                            {tier.requirements.map((requirement, index) => (
                                <li key={index} className="text-[12px] list-outside text-pretty">{requirement}</li>
                            ))}
                        </Flex>

                        {/* Limits */}
                        <Text size="1" align="center" className={`my-4 font-bold ${tier.color}`}>
                            Limits
                        </Text>
                        <Flex className="horizontal-list mb-4 gap-2 flex-wrap">
                            {tier.limits.map((requirement, index) => (
                                <li key={index} className="text-[12px] list-outside text-pretty">{requirement}</li>
                            ))}
                        </Flex>

                        {/* Benefits */}
                        <Text size="1" align="center" className={`my-4 font-bold ${tier.color}`}>
                            Special Benefits
                        </Text>
                        <Flex className="horizontal-list mb-4 gap-2 flex-wrap">
                            {tier.benefits.map((requirement, index) => (
                                <li key={index} className="text-[12px] list-outside text-pretty">{requirement}</li>
                            ))}
                        </Flex>
                    </div>

                    {/* Action Button */}
                    <Button variant="soft" color="gray" radius="full" size="2" className="w-fit mx-auto my-3 self-stretch flex">
                        {tier.buttonText}
                    </Button>
                </Box>
            </motion.div>
        ))}
    </motion.div>;
}