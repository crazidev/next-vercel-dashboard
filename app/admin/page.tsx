import { admin_delete_user_action } from "@/actions/admin/delete_user_action";
import { AlertComponent } from "@/components/AlertComponent";
import { NavBar } from "@/components/NavBar";
import { DropdownMenu } from "@radix-ui/themes";

export default async function AdminDashboard({ }: {}) {
    // var user_id = (await authUser()).user_id;
    // var user = await fetchUser(user_id);
    // var walletList = await fetchUserWallets(user_id ?? -1);

    return (
        <div className="flex flex-row flex-grow gap-5">
            <NavBar title="Administrator" description="" />
            <AlertComponent />
        </div>
    )
}
