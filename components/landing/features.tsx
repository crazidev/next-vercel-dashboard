"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBeamMultipleOutputDemo from '../animated_beam/animted_beam_multi_output';

export default function FeaturesSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const scale1 = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]); // Feature 1
    const scale2 = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]); // Feature 2
    const scale3 = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]); // Feature 3

    return (
        <section ref={sectionRef} className="min-h-[150vh] py-12 mobile:px-2 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                <motion.div
                    style={{ scale: scale1 }}
                    className="sticky top-[100px] mobile:h-[550px] h-[80vh] w-full bg-[var(--gray-2)] border-0 border-[var(--gray-5)] rounded-3xl"
                >
                    <div className='flex p-[20px] py-[30px] flex-row w-full mobile:flex-col mobile:justify-between items-center h-full mobile:gap-10 gap-20'>
                        <AnimatedBeamMultipleOutputDemo className='mobile:h-auto w-full' />

                        <div className='flex flex-col items-center justify-center'>
                            <div className="text-start italic text-[40px] mobile:text-[30px] font-mono">
                                Crypto Banking Made Simple
                            </div>
                            <div className="text-gray-500 italic text-[14px]">
                                Deposit, transfer, and swap between crypto and fiat effortlessly. Take control of your digital assets with a platform built for the future.
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ scale: scale2 }}
                    className="sticky top-[100px] h-[80vh] w-full bg-[var(--gray-2)] border-0 border-[var(--gray-5)] rounded-3xl"
                >
                    <div className=''>
                    </div>
                </motion.div>

                <motion.div
                    style={{ scale: scale3 }}
                    className="sticky top-[100px] h-[80vh] w-full bg-[var(--gray-2)] border-0 border-[var(--gray-5)] rounded-3xl"
                >
                    <div className=''>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}