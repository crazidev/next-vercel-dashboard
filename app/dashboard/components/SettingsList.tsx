'use client';

import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbCheck, TbCircle } from "react-icons/tb";
import { motion } from "motion/react"

export const SettingsList = ({
    value
}: any) => {

    var router = useRouter();
    var pathname = usePathname();
    var list = [{
        name: 'Profile',
        path: '/dashboard/settings'
    },
    {
        name: 'Account Limit',
        path: '/dashboard/settings/account-limit'
    },
    {
        name: 'Change Password',
        path: '/dashboard/settings/change-password'
    }
    ];

    return <motion.div
        layout
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        transition={{
            duration: 0.3,
        }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}
    >
        {list.map(function (e, i) {
            var isActive = e.path == pathname;
            return <motion.div
            whileTap={{
                scale: 1.1
            }}
            key={e.path}
            >
                <Link  prefetch href={e.path} ><Button key={e.path} radius="full" color={isActive ? 'gray' : undefined} variant={isActive ? "solid" : "soft"} >{e.name}</Button></Link>
            </motion.div>;
        })}
    </motion.div>


}