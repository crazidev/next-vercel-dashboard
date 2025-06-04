import { Shape1 } from "@/components/shapes/shape_1";
import { SideBarComponent } from "@/components/SideBar";
import { Shape2 } from "@/components/shapes/shape_2";
import { Container } from "@radix-ui/themes";
import { headers } from "next/headers";
import { CryptoConvertProvider } from "context/CryptoConvertContext";
import { authUser } from "@/actions/authUser";
import { fetchUser } from "@/fetch/fetch_user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var user_id = (await authUser()).user_id;
  var user = await fetchUser(user_id, { force: true });

  if (!user) {
    redirect("/auth/login");
  } else if (user.ssnStatus !== "verified" || user.idDocStatus !== "verified") {
    redirect("/auth/verification");
  }

  return (
    <div>
      {/* <Shape1 className={"fixed bottom-0 left-[-100px] -z-10 w-[300px]"} /> */}

      <div className="flex flex-row">
        <CryptoConvertProvider>
          <SideBarComponent isAdmin={false}>
            <div className="flex w-[100%] flex-grow flex-col">{children}</div>
          </SideBarComponent>
        </CryptoConvertProvider>
      </div>
    </div>
  );
}
