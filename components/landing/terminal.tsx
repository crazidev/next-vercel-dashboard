"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function TerminalComponent() {
    return (
        <Terminal>
            <TypingAnimation> Initiating Fortress Protocol...</TypingAnimation>

            <AnimatedSpan delay={1000} className="text-green-500">
                <span>✔ Fiat Vault: AES-256 quantum shield activated</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2000} className="text-green-500">
                <span>✔ Crypto Core: Cold storage locked</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3000} className="text-green-500">
                <span>✔ Crypto Core: Multisig fortress engaged</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4000} className="text-green-500">
                <span>✔ Stock Grid: Real-time sentinel scans online</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5000} className="text-green-500">
                <span>✔ Firewall: Intrusion defenses armed</span>
            </AnimatedSpan>

            <AnimatedSpan delay={6000} className="text-blue-500">
                <span>✔ MFA enforced across all systems</span>
            </AnimatedSpan>
        </Terminal>
    );
}



export const AnimatedSpan = ({
    children,
    delay = 0,
    className,
    ...props
}: AnimatedSpanProps) => (
    <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay / 1000 }}
        className={cn("grid text-[12px] font-normal tracking-tight", className)}
        {...props}
    >
        {children}
    </motion.div>
);

interface TypingAnimationProps extends MotionProps {
    children: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
}

export const TypingAnimation = ({
    children,
    className,
    duration = 60,
    delay = 0,
    as: Component = "span",
    ...props
}: TypingAnimationProps) => {
    if (typeof children !== "string") {
        throw new Error("TypingAnimation: children must be a string. Received:");
    }

    const MotionComponent = motion.create(Component, {
        forwardMotionProps: true,
    });

    const [displayedText, setDisplayedText] = useState<string>("");
    const [started, setStarted] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [children, duration, started]);

    return (
        <MotionComponent
            ref={elementRef}
            className={cn("text-sm font-normal tracking-tight", className)}
            {...props}
        >
            {displayedText}
        </MotionComponent>
    );
};

interface TerminalProps {
    children: React.ReactNode;
    className?: string;
}

export const Terminal = ({ children, className }: TerminalProps) => {
    return (
        <div
            className={cn(
                "z-0 h-full overflow-hidden max-h-[400px] w-full rounded-xl border border-border bg-",
                className,
            )}
        >
            <div className="flex flex-col gap-y-2 border-b border-border p-4">
                <div className="flex flex-row gap-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
            </div>
            <pre className="p-4">
                <code className="grid gap-y-1 overflow-hidden text-wrap">{children}</code>
            </pre>
        </div>
    );
};
