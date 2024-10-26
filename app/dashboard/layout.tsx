import { Shape1 } from "app/auth/shapes/shape_1";
import Providers from "./providers";
import { SideBarComponent } from "./components/sidebar";
import { NavBar } from "./components/my-navbar";
import DashboardContext from "./providers";
import DashboardProvider from "./providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Shape1 className={"left-[-100px] bottom-0 w-[300px] fixed -z-10 "} />
      {/* <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v] "} /> */}
      <div className="flex flex-row">
        <SideBarComponent children={children} />
      </div>
    </div>
  );
}
