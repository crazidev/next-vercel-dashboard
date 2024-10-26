import { Text } from "@radix-ui/themes";
import { NavBar } from "./components/my-navbar";

export default async function HomePage({}: {}) {
  return (
    <div className="flex flex-col flex-grow w-[100%]">
      <div className="flex flex-col py-1">
        <Text size={"5"} weight={"bold"}>
          My Dashboard
        </Text>

        <Text className="font-[12px] text-pretty" color="gray">
          Welcome to SYNC Dashboard
        </Text>
      </div>
      {/* <div className="mt-5 h-[1000px] w-[100%] bg-red-950"></div> */}
    </div>
  );
}
