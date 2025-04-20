'use client';

import { logout } from "@/actions/auth/logout";
import { DropdownMenu } from "@radix-ui/themes";

export default function LogoutButton() {
    return <DropdownMenu.Item onClick={(e) => logout()}>Logout</DropdownMenu.Item>;
}