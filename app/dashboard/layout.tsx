import { Shape1 } from "@/components/shapes/shape_1";
import { SideBarComponent } from "@/components/SideBar";
import { Shape2 } from "@/components/shapes/shape_2";
import { Container } from "@radix-ui/themes";
import { headers } from "next/headers";
import { CryptoConvertProvider } from "context/CryptoConvertContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
