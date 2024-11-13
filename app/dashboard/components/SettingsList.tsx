'use client';

import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbCheck, TbCircle } from "react-icons/tb";

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
    },
    {
        name: 'Verification Status',
        path: '/dashboard/settings/verification-status'
    }
    ];

    return <Flex gap={'4'} wrap={"wrap"} direction={"row"}>
        {list.map(function (e) {
            var isActive = e.path == pathname;
            return <Link prefetch href={e.path} ><Button key={e.path} radius="full" color={!isActive && 'gray'} variant={isActive ? "solid" : "soft"} >{e.name}</Button></Link>;
        })}
    </Flex>
}