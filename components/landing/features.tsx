"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import AnimatedBeamMultipleOutputDemo from "../animated_beam/animted_beam_multi_output";
import multiWalletImg from "@public/multi-wallet.png";
import Image from "next/image";
import { ThemeContext } from "../hooks/useThemeContext";
import { StarIcon } from "lucide-react";
import { Text } from "@radix-ui/themes";
import { TerminalComponent } from "./terminal";
import { getFeatureContent } from "content/getFeatureContent";

export default function FeaturesSection({ wallets }) {
  const sectionRef = useRef(null);
  const securityRef = useRef(null);
  var themeContext = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]); // Feature 1
  const scale2 = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]); // Feature 2
  const scale3 = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]); // Feature 3

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible (optional)
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (securityRef.current) {
      observer.observe(securityRef.current);
    }

    return () => {
      if (securityRef.current) {
        observer.unobserve(securityRef.current);
      }
    };
  }, []);

  var features = getFeatureContent({
    isDark: themeContext.dark,
    wallets: wallets,
  }).find((e) => e.appName == process.env.NEXT_PUBLIC_APP_CONTENT);

  return (
    <section
      ref={sectionRef}
      className="min-h-[150vh] py-12 mobile:px-2 px-4 bg-[var(--gray-2)]"
    >
      <div className="p-[20px]">
        <div className="flex items-center gap-3 justify-center">
          <StarIcon />
          <Text size={"5"} weight={"bold"}>
            FEATURES
          </Text>
        </div>
        <div className="text-center text-[40px] mobile:text-[30px] font-mono">
          Banking That Works for You
        </div>
      </div>

      <div className="mt-[50px] max-w-5xl mx-auto space-y-6">
        {features.features.map((feature, index) => (
          <FeatureCard
            key={"feature_" + index}
            title={feature.title}
            description={feature.description}
            image={
              feature.image_type == "image" ? (
                <img
                  src={feature.image.toString()}
                  className="object-contain"
                  alt={feature.title}
                />
              ) : (
                feature.image
              )
            }
            style={{}}
            ref={undefined}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ title, description, image, style, ref }) {
  return (
    <motion.div
      ref={ref}
      // style={style}
      className={
        "sticky top-[100px] mobile:h-[550px] h-[80vh] w-full bg-white dark:bg-[var(--gray-2)] border-2 border-[var(--gray-5)] from-[var(--gray-2)] to-[var(--accent-2)] dark:bg-gradient-to-bls  rounded-3xl"
      }
    >
      <div className="flex p-[20px] py-[30px] flex-row mobile:w-full mobile:flex-col mobile:justify-start justify-center items-center h-full mobile:gap-10 gap-10">
        <div className="w-[100%] h-full flex">{image}</div>

        <div className="flex flex-col items-start h-full w-full justify-center mobile:justify-start">
          <div className="text-start italic sm:text-[35px] md:text-[40px] mobile:text-[25px] font-bold font-mono">
            {title}
          </div>
          <div className="text-gray-500 italic text-[14px]">{description}</div>
        </div>
      </div>
    </motion.div>
  );
}
