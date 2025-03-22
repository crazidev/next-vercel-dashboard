'use client';

import { Button, DropdownMenu } from "@radix-ui/themes";
import UpdateBalanceDialog from "./dialogs/update_balance";
import { Users } from "@/database/models/users";
import { useEffect, useState } from "react";
import AddTransactionDialog from "./dialogs/add_transaction";
import ChangePasswordDialog from "./dialogs/change_password";
import UpdateKYCDialog from "./dialogs/update_kyc_status";
import { admin_delete_user_action } from "@/actions/admin/delete_user_action";

export function ProfileActionButton({ user }: { user: Users }) {
    const [dialog1, setDialog1] = useState(false);
    const [dialog2, setDialog2] = useState(false);
    const [dialog3, setDialog3] = useState(false);
    const [dialog4, setDialog4] = useState(false);

    useEffect(() => {
        if (user.id.toString() == '38272907') {
            // setDialog4(true);
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
            <DropdownMenu.Item onClick={() => setDialog4(true)}>Change KYC Status</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setDialog3(true)}>Change Password</DropdownMenu.Item>
            <DropdownMenu.Item onClick={async () => {
                await admin_delete_user_action({ userId: user.id });
            }}>Delete User</DropdownMenu.Item>
            {/* <DropdownMenu.Item>Delete User</DropdownMenu.Item> */}
        </DropdownMenu.Content>
        <UpdateBalanceDialog user={user} isOpen={dialog1} setIsOpen={setDialog1} />
        <AddTransactionDialog user={user} isOpen={dialog2} setIsOpen={setDialog2} />
        <ChangePasswordDialog user={user} isOpen={dialog3} setIsOpen={setDialog3} />
        <UpdateKYCDialog user={user} isOpen={dialog4} setIsOpen={setDialog4} />
    </DropdownMenu.Root>
}