import { SideBarComponent } from "@/components/SideBar";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";
import { redirect } from "next/navigation";
import { store } from "@/lib/store/store";
import { authSlice } from "@/lib/store/slices/authSlice";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id, { force: true });

  store.dispatch(authSlice.actions.setUser(user));

  if (!user) {
    redirect("/auth/login");
  } else if (user.ssnStatus !== "verified" || user.idDocStatus !== "verified") {
    redirect("/auth/verification");
  }

  return (
    <div>
      {/* <Shape1 className={"fixed bottom-0 left-[-100px] -z-10 w-[300px]"} /> */}

      <div className="flex flex-row">
        {/* <CryptoConvertProvider> */}
        <SideBarComponent isAdmin={false}>
          <div className="flex w-[100%] flex-grow flex-col">{children}</div>
        </SideBarComponent>
        {/* </CryptoConvertProvider> */}
      </div>
    </div>
  );
}
