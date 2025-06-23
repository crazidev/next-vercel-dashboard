import { SideBarComponent } from "@/components/SideBar";
// import { CryptoConvertProvider } from "@context/CryptoConvertContext";
import { Container } from "@radix-ui/themes";
import { headers } from "next/headers";
// import { CryptoConvertProvider } from "context/CryptoConvertContext";

export default function ADashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-row">
        {/* <CryptoConvertProvider> */}
        <SideBarComponent isAdmin={true}>
          <div className="flex w-[100%] flex-grow flex-col">{children}</div>
        </SideBarComponent>
        {/* </CryptoConvertProvider> */}
      </div>
    </div>
  );
}
