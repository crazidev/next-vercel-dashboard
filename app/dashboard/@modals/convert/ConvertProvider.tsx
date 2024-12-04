import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";
import ConvertModal from "./ConvertModal";
import { fetchUserWallets } from "@/fetch/fetch_wallets";

export async function ConvertProvider() {
    var user_id = (await authUser()).user_id;
    var user = await fetchUser(user_id);
    var walletList = await fetchUserWallets(user_id ?? -1);

    return <ConvertModal walletList={walletList} user={user} />
}