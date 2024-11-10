import { Shape1 } from "app/auth/components/shapes/shape_1";
import { SideBarComponent } from "./components/SideBar";
import { Shape2 } from "app/auth/components/shapes/shape_2";
import { Container } from "@radix-ui/themes";
import { headers } from "next/headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Shape1 className={"left-[-100px] bottom-0 w-[300px] fixed -z-10 "} />

      <div className="flex flex-row">
        <SideBarComponent>
          {/* <Container> */}
            <div className="flex flex-col flex-grow w-[100%]">{children}</div>
          {/* </Container> */}
        </SideBarComponent>
      </div>
    </div>
  );
}
