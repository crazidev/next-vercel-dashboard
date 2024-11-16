import { AuthContainerLogo } from "@/components/AuthContainerLogo";
import { MyCard } from "@/components/MyCard";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Tailwind } from "@react-email/tailwind";
// import { Shape1 } from "app/auth/components/shapes/shape_1";
// import { Shape2 } from "app/auth/components/shapes/shape_2";
import { Copyright } from "lucide-react";
import ShadeGenerator, { Shade } from "shade-generator";

export function EmailTemplate({ title, children }: { children: any, title: string }) {

    var date = new Date();

    const config: Record<Shade, number> = {
        "10": 0.9,
        "20": 0.8,
        "30": 0.7,
        "40": 0.6,
        "50": 0.5,
        "60": 0.4,
        "70": 0.3,
        "80": 0.2,
        "90": 0.1,
        "100": 0,
        "200": 0.9,
        "300": 0.8,
        "400": 0.7,
        "500": 0.6,
        "600": 0.5,
        "700": 0.4,
        "800": 0.3,
        "900": 0.2,
        "1000": 0.1,
    };

    const colorMap = ShadeGenerator.hue("#AB4ABA").config(config).shadesMap("hex");

    return <Tailwind config={{
        darkMode: ["class"],
        theme: {
            extend: {
                colors: {
                    primary: {
                        100: colorMap['20'],
                        200: colorMap['40'],
                        300: colorMap['60'],
                        400: colorMap['80'],
                        500: colorMap['100'],
                        600: colorMap['200'],
                        700: colorMap['400'],
                        800: colorMap['600'],
                        900: colorMap['800'],
                        DEFAULT: colorMap['100'],
                        text: 'white',
                        light: '#F4D4F4',
                        dark: '#451D47'
                    },
                    secondary: {
                        DEFAULT: '#F112F108',
                        text: '#E796F3',
                    },
                    gray: {
                        DEFAULT: '#B5B3AD',
                        disabled: '#5B625F',
                    },
                    background: '#111',
                    card: '#F4F4F309'
                },
                animation: {
                    "spin-slow": "spin 5s linear infinite",
                    "bounce-slow": "bounce 2s linear infinite",
                },
            }
        }
    }}>
        <html className="dark bg-background text-primary-100" style={{
            fontSize: "14px",
            fontFamily: "sans-serif"
        }}>
            <div className="bg-[#f1121203] w-full h-full fixed m-0 right-0 left-0 top-0 bottom-0"></div>
            <body className="m-0">
                {/* <Shape1 from="#F22FF211" to="#FFFFFF12" className={"fixed top-[20px] right-[-100px] w-[300px]"} /> */}
                {/* <Shape2 className={"fixed left-[-80px] top-[-50px] h-[100vh] w-[50v]"} /> */}


                <div className="p-3">
                    <div className="flex justify-center fill-primary mt-5">
                        <AuthContainerLogo />
                    </div>
                    <div className="p-3 max-w-[500px] mx-auto backdrop-blur-md bg-card mt-[30px] rounded-xl">
                        <div className="font-semibold text-[20px] text-center text-primary mb-[20px] mt-[10px]">{title}</div>
                        {children}
                    </div>
                </div>
                <div className="flex flex-col text-[10px] items-center text-gray my-[20px]">
                    <div className="flex flex-row items-center gap-2">
                        <Copyright size={10} /> Hybank.us {date.getFullYear()}
                    </div>
                </div>
            </body>
        </html>
    </Tailwind>
}


export default EmailTemplate;