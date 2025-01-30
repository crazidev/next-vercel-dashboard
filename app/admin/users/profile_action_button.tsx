'use client';

import { Button, DropdownMenu } from "@radix-ui/themes";
import UpdateBalanceDialog from "./dialogs/update_balance";
import { Users } from "@/database/models/users";
import { useEffect, useState } from "react";
import AddTransactionDialog from "./dialogs/add_transaction";

export function ProfileActionButton({ user }: { user: Users }) {
    const [dialog1, setDialog1] = useState(false);
    const [dialog2, setDialog2] = useState(false);

    useEffect(() => {
        if (user.id.toString() == '38272907') {
            setDialog2(true);
        }
    }, [user]);

    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button variant="soft" color="gray">
                <DropdownMenu.TriggerIcon />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setDialog1(true)}>Update Balance</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setDialog2(true)}>Add Transaction</DropdownMenu.Item>
            <DropdownMenu.Item>Change KYC Status</DropdownMenu.Item>
            <DropdownMenu.Item>Change Password</DropdownMenu.Item>
            <DropdownMenu.Item>Delete User</DropdownMenu.Item>
        </DropdownMenu.Content>
        <UpdateBalanceDialog user={user} isOpen={dialog1} setIsOpen={setDialog1} />
        <AddTransactionDialog user={user} isOpen={dialog2} setIsOpen={setDialog2} />
    </DropdownMenu.Root>
}