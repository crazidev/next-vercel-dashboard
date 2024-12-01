import { Box, Button, Flex } from "@radix-ui/themes";
import { SettingsList } from "@/components/SettingsList";
import { NavBar } from "../../../components/NavBar";
import React from "react";
import getSequelizeInstance from "@/database/db";

export default async function SettingsLayout(
    {
        params,
        children
    }: {
        params: Promise<{ sub?: string }>,
        children: React.ReactNode
    }
) {
    var sub = (await params).sub;

    return <div className="flex flex-row flex-grow gap-5 w-[100%]">
        <div className="flex flex-col flex-grow flex-[9] w-[100%]">
            <NavBar title="Settings" description="Manage your settings & preference" />
            <SettingsList value={sub}/>
            <Box height={"30px"} />
            {children}
        </div>
    </div>

}