import AnimatedBeamMultipleOutputDemo from "@/components/animated_beam/animted_beam_multi_output";
import { Logo } from "@/components/shapes/logo";
import { Text } from "@radix-ui/themes";

import Image from "next/image";
import { ArrowRightCircleIcon, StarIcon } from "lucide-react";
import { Globe } from "@/components/animated_beam/globe";
import FeaturesSection from "@/components/landing/features";
import { DarkModeToggler } from "@/components/DarkModeToggler";
import { Wallets } from "@/database/models/wallets";
import getSequelizeInstance from "@/database/db";
import { TerminalComponent } from "@/components/landing/terminal";

export default async function RootPage() {
    var wallets = [];
    // try {
    //     await getSequelizeInstance();
    //     var data = await Wallets.findAll();
    //     wallets = data.map((e) => e.toJSON());
    //     // console.log(wallets)
    // } catch (error) {
    //     // console.log(error)
    // }
    return <div className="">
        <nav className="flex overflow-hidden justify-between sticky top-0 flex-row items-center p-[20px] mobile:px-[20px] px-[50px]">
            <div className="
            p-[15px]
            
            pr-[20px]
            items-center
            w-auto
            gap-2
            flex flex-row 
            backdrop-blur-sm 
            inset-0
            rounded-[30px]
            bg-[var(--gray-a2)]">
                <Logo className="w-[30px] h-[30px] fill-primary-500" />
                <Text weight={"bold"}>{process.env.NEXT_PUBLIC_APP_NAME}</Text>
            </div>
            <div>
                <div className="
            p-[15px]
            items-center
            w-auto
            gap-2
            flex flex-row 
            backdrop-blur-sm 
            inset-0
            rounded-[30px]
            bg-[var(--gray-a2)]">
                    <DarkModeToggler />
                </div>
            </div>
        </nav>
        {/* ========= HERO SECTION */}
        <div className="hd-[80v]">
            <div className="flex mobile:flex-col gap-10 justify-between p-[20px] mobile:pl-[20px] pl-[50px]">
                <div className="text-[60px] line-clamp-1 mobile:text-[40px] font-mono flex flex-col mobile:gap-4 mobile:mt-3 gap-7">
                    <div>
                        <div>All-in-One</div>
                        <div><b>Banking</b> &</div>
                        <div>Crypto Solution</div>
                    </div>
                    <div className="text-gray-500 italic text-[14px] max-w-[400px] font-mono">
                        Seamlessly manage fiat, crypto, and stocks with cutting-edge tools and live support—banking redefined for the modern age.
                    </div>
                    <div className="mt-[30px]">
                        <div className="dark:bg-white bg-black flex flex-row max-w-[240px] justify-between gap-2 items-center text-[18px] font-bold dark:text-black text-white rounded-[50px] py-[10px] pl-[20px] pr-[10px] hover:pr-[15px] hover:pl-[25px] transition-all">
                            Get Started
                            <div className="dark:bg-black bg-white rounded-full p-3"><ArrowRightCircleIcon className="stroke-black dark:stroke-white" /></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 justify-center flex-row mobile:mt-[10px] mt-[-70px]">
                    <img src={'frame-1.png'} alt={"Mockup"} height={600} />
                    {/* <div className="absolute -z-10">
                        <Globe />
                    </div> */}
                </div>
            </div>
        </div>

        <FeaturesSection wallets={wallets} />
        <div className="py-10 pr-0 mx-auto justify-center w-full mobile:px-2 px-10 flex items-center flex-row mobile:flex-col">
            <div className="flex flex-col mobile:items-center items-end text-end mobile:text-center">
                <div className="sm:text-[35px] md:text-[40px] mobile:text-[30px] font-bold font-mono">
                    Finance <div>Without Borders</div>
                </div>
                <div className="text-gray-500 text-[14px]">
                    Spin the globe your way—manage, convert, and grow fiat, crypto, and stocks on a platform that’s secure, seamless, and worldwide.
                </div>
            </div>
            <div className="w-full h-[500px] overflow-hidden flex flex-col items-center relative bg-transparent dark:bg-transparent">
                <Globe className="absolute" />
            </div>
        </div>
    </div >
}