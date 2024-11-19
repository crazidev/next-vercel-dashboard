import { Shape1 } from "app/auth/components/shapes/shape_1";
import { SideBarComponent } from "app/dashboard/components/SideBar";
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
      <Shape1 className={"fixed bottom-0 left-[-100px] -z-10 w-[300px]"} />

      <div className="flex flex-row">
        <SideBarComponent>
          {/* <Container> */}
            <div className="flex w-[100%] flex-grow flex-col">{children}</div>
          {/* </Container> */}
        </SideBarComponent>
      </div>
    </div>
  );
}
