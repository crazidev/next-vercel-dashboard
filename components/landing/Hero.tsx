import { getHeroContent } from "content/getHeroContent";
import { ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  var hero = getHeroContent().find(
    (e) => e.appName == process.env.NEXT_PUBLIC_APP_CONTENT
  );

  return (
    <div className="hd-[80v] relative">
      <div className="flex mobile:flex-col gap-10 justify-between p-[20px] mobile:pl-[20px] pl-[50px]">
        <div className="text-[60px] line-clamp-1 mobile:text-[40px] font-mono flex flex-col mobile:gap-4 mobile:mt-3 gap-7">
          {hero.title}
          <div className="text-gray-500 italic text-[14px] max-w-[400px] font-mono">
            {hero.description}
          </div>
          <div className="mt-[30px]">
            <Link href="/auth/login">
              <div className="dark:bg-white bg-black flex flex-row max-w-[240px] justify-between gap-2 items-center text-[18px] font-bold dark:text-black text-white rounded-[50px] py-[10px] pl-[20px] pr-[10px] hover:pr-[15px] hover:pl-[25px] transition-all">
                {hero.button_title}
                <div className="dark:bg-black bg-white rounded-full p-3">
                  <ArrowRightCircleIcon className="stroke-black dark:stroke-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 justify-center flex-row mobile:mt-[10px] mt-[-70px]">
          {hero.image}
        </div>
      </div>
    </div>
  );
}
