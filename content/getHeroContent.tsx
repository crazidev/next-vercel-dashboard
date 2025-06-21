import AnimatedBeamMultipleOutputDemo from "@/components/animated_beam/animted_beam_multi_output";
import { TerminalComponent } from "@/components/landing/terminal";
import { ReactNode } from "react";

interface HeroContentType {
  appName: string;
  isDefault: boolean;
  title: ReactNode;
  description: string;
  button_title: string;
  image: ReactNode;
}

export function getHeroContent(): HeroContentType[] {
  return [
    {
      appName: "default",
      isDefault: true,
      title: (
        <div>
          <div>All-in-One</div>
          <div>
            <b>Banking</b> &
          </div>
          <div>Crypto Solution</div>
        </div>
      ),
      description:
        "Seamlessly manage fiat, crypto, and stocks with cutting-edge tools and live support—banking redefined for the modern age.",
      button_title: "Get Started",
      image: <img src={"frame-1-nologo.png"} alt={"Mockup"} height={500} />,
    },
  ];
}
