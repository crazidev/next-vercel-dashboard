import { NavBar } from "./components/my-navbar";

export default async function HomePage({}: {}) {
  return (
    <div className="flex flex-col flex-grow w-[100%]">
      <NavBar title="My Dashboard" />
      {/* <div className="mt-5 h-[1000px] w-[100%] bg-red-950"></div> */}
    </div>
  );
}
