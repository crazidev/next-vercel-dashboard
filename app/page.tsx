import { Logo } from "@/components/shapes/logo";
import { Text } from "@radix-ui/themes";

import { Globe } from "@/components/animated_beam/globe";
import { DarkModeToggler } from "@/components/DarkModeToggler";
import { Wallets } from "@/database/models/wallets";
import getSequelizeInstance from "@/database/db";
import { SparklesText } from "@/components/landing/sparkly_text";
import { TierCardList } from "@/components/TierCardList";
import { Hero } from "@/components/landing/Hero";
import { ReviewView } from "@/components/landing/ReviewView";
import { FeaturesSection } from "@/components/landing/Features";

export default async function RootPage() {
  var wallets = [];
  try {
    await getSequelizeInstance();
    var data = await Wallets.findAll();
    wallets = data.map((e) => e.toJSON());
    // logger(wallets)
  } catch (error) {
    // logger(error)
  }
  return (
    <div className="">
      {/* ========= NAV SECTION */}
      <nav className="flex overflow-hidden justify-between sticky top-0 flex-row items-center p-[20px] mobile:px-[20px] px-[50px]">
        <div
          className="
            p-[15px]
            
            pr-[20px]
            items-center
            w-auto
            gap-2
            flex flex-row 
            backdrop-blur-sm 
            inset-0
            rounded-[30px]
            bg-[var(--gray-a2)]"
        >
          <Logo className="w-[30px] h-[30px] fill-primary-500" />
          <Text weight={"bold"}>{process.env.NEXT_PUBLIC_APP_NAME}</Text>
        </div>
        <div
          className="
                p-[15px]
                items-center
                w-auto
                gap-2
                flex flex-row 
                backdrop-blur-sm 
                inset-0
                z-50
                rounded-[30px]
                bg-[var(--gray-a2)]"
          style={{ cursor: "pointer" }}
        >
          <label style={{ display: "block", width: "100%", height: "100%" }}>
            <DarkModeToggler />
          </label>
        </div>
      </nav>

      {/* ========= HERO SECTION */}
      <Hero />

      {/* ========= FEATURES SECTION */}
      <FeaturesSection wallets={wallets} />

      <div className="relative py-10 pr-0 mx-auto justify-center w-full mobile:px-2 px-10 flex items-center flex-row mobile:flex-col">
        <div className="flex flex-col mobile:items-center items-end text-end mobile:text-center">
          <div className="sm:text-[35px] md:text-[40px] mobile:text-[30px] font-bold font-mono">
            <SparklesText
              text={
                <>
                  Finance <div>Without Borders</div>
                </>
              }
            />
          </div>
          <div className="text-gray-500 text-[14px]">
            Spin the globe your way—manage, convert, and grow fiat, crypto, and
            stocks on a platform that’s secure, seamless, and worldwide.
          </div>
        </div>
        <div className="w-full h-[500px] overflow-hidden flex flex-col items-center relative bg-transparent dark:bg-transparent">
          <Globe className="absolute" />
        </div>
        {/* <BackgroundBeams /> */}
      </div>

      {/* ========= TIER SECTION */}
      <div className="relative py-10 pr-0 mx-auto justify-center w-full mobile:px-2 px-10 flex items-center flex-row mobile:flex-col">
        <div className="flex flex-col mobile:items-center items-center text-end mobile:text-center">
          <div className="sm:text-[35px] md:text-[40px] mobile:text-[30px] font-bold font-mono">
            {`${process.env.NEXT_PUBLIC_APP_SHORT_NAME} for Everyone `}
          </div>
          <div className="text-gray-500 text-[14px] mb-10">
            Discover the perfect account for your needs. Wether you're saving,
            growing a business, or scaling with advance features,{" "}
            {process.env.NEXT_PUBLIC_APP_SHORT_NAME} have options for you
          </div>
          <TierCardList showButton={false} />
        </div>
      </div>

      {/* ========= REVIEWS SECTION */}
      <div className="relative py-10 justify-center w-full flex items-center flex-col gap-5">
        <div className="flex flex-col text-center">
          <div className="sm:text-[35px] md:text-[40px] mobile:text-[30px] font-bold font-mono">
            What Our Users Say
          </div>
          <div className="text-gray-500 text-[14px]"></div>
        </div>
        <ReviewView />
      </div>

      {/* ========= FOOTER SECTION */}
      <footer className=" rounded-lg shadow-sm p-2">
        <div className="w-full max-w-screen-xl mx-auto p-2 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="void()"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Logo className="w-[30px] h-[30px] fill-primary-500" />
              <Text weight={"bold"}>{process.env.NEXT_PUBLIC_APP_NAME}</Text>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="flex flex-col items-center">
            <div className="mt-2 block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              FDIC Insured | Licensed by the Federal Reserve
            </div>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="void()" className="hover:underline">
                {process.env.NEXT_PUBLIC_APP_NAME}™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
