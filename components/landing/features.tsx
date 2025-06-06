"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import AnimatedBeamMultipleOutputDemo from '../animated_beam/animted_beam_multi_output';
import multiWalletImg from "@public/multi-wallet.png";
import Image from 'next/image';
import { ThemeContext } from '../hooks/useThemeContext';
import { StarIcon } from 'lucide-react';
import { Text } from '@radix-ui/themes';
import { TerminalComponent } from './terminal';

export default function FeaturesSection({ wallets }) {
    const sectionRef = useRef(null);
    const securityRef = useRef(null); // Ref for the security feature
    const [isVisible, setIsVisible] = useState(false); // State to track visibility
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    var themeContext = useContext(ThemeContext);


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

    return (
        <section ref={sectionRef} className="min-h-[150vh] py-12 mobile:px-2 px-4 bg-[var(--gray-2)]">
            <div className="p-[20px]">
                <div className="flex items-center gap-3 justify-center">
                    <StarIcon />
                    <Text size={'5'} weight={'bold'}>
                        FEATURES
                    </Text>
                </div>
                <div className="text-center text-[40px] mobile:text-[30px] font-mono">
                    Banking That Works for You
                </div>

            </div>

            <div className="mt-[50px] max-w-5xl mx-auto space-y-6">
                <FeatureCard
                    title={'Crypto Banking Made Simple'}
                    description={'Deposit, transfer, and swap between crypto and fiat effortlessly. Take control of your digital assets with a platform built for the future.'}
                    image={<AnimatedBeamMultipleOutputDemo className='w-full' wallets={wallets} />} style={{ scale: scale1 }} ref={undefined} />

                <FeatureCard
                    title={<div>
                        Multi-Wallet <div>
                            Flexibility
                        </div>
                    </div>}
                    description={'Manage multiple wallets in one place—crypto, fiat, and stocks—all secured and accessible anytime, anywhere.'}
                    image={<img src={themeContext.dark ? "multi-wallet.png" : "multi-wallet-light.png"} className='object-contain' alt={'Multi-Wallet Flexibility'} />} style={{ scale: scale2 }} ref={undefined} />

                <FeatureCard
                    title={<div>
                        Fast Fiat <div>Transactions</div>
                    </div>}
                    description={'Enjoy hassle-free wire transfers and ACH payments for your traditional banking needs, paired with next-gen efficiency.'}
                    image={<img src={themeContext.dark ? "fast-transfer.png" : "fast-transfer-light.png"} className='object-contain' alt={'Fast Fiat Transactions'} />} style={{ scale: scale3 }} ref={undefined} />

                <FeatureCard
                    title={<div>
                        Multi-Asset <div>Conversions</div>
                    </div>}
                    description={'Convert fiat to crypto, crypto to stocks, or stocks to fiat in seconds—unmatched flexibility for your financial needs.'}
                    image={<img src={themeContext.dark ? "convert.png" : "convert-light.png"} className='object-contain' alt={'Fast Fiat Transactions'} />} style={{ scale: scale3 }} ref={undefined} />

                <FeatureCard
                    title={<div>
                        Unbreakable Security
                    </div>}
                    description={'Rest easy with AES-256 encryption, cold storage for crypto, and real-time monitoring—your assets are safe and sound.'} image={<div className='flex justify-center items-center'>
                        <TerminalComponent />
                    </div>} style={{ scale: scale3 }} ref={securityRef} />


            </div>
        </section>
    );
}

function FeatureCard({
    title, description, image,
    style,
    ref
}) {
    return <motion.div
        ref={ref}
        // style={style}
        className={'sticky top-[100px] mobile:h-[550px] h-[80vh] w-full bg-white dark:bg-[var(--gray-2)] border-2 border-[var(--gray-5)] from-[var(--gray-2)] to-[var(--accent-2)] dark:bg-gradient-to-bls  rounded-3xl'}
    >
        <div className='flex p-[20px] py-[30px] flex-row mobile:w-full mobile:flex-col mobile:justify-start justify-center items-center h-full mobile:gap-10 gap-10'>
            <div className='w-[100%] h-full flex'>
                {image}
            </div>

            <div className='flex flex-col items-start h-full w-full justify-center mobile:justify-start'>
                <div className="text-start italic sm:text-[35px] md:text-[40px] mobile:text-[25px] font-bold font-mono">
                    {title}
                </div>
                <div className="text-gray-500 italic text-[14px]">
                    {description}
                </div>
            </div>
        </div>
    </motion.div>
}

