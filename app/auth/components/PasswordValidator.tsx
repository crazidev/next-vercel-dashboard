// components/PasswordValidator.tsx

import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";  // Checkmark and Cross icons
import { Text } from "@radix-ui/themes";

interface PasswordValidatorProps {
    password: string;
    isTouched: boolean;
}

export const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password, isTouched }) => {
    const [passwordConditions, setPasswordConditions] = useState({
        minLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isValid: false,
    });

    useEffect(() => {
        setPasswordConditions({
            minLength: (password?.length ?? 0) >= 6,
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[\W_]/.test(password),
            isValid: (password?.length ?? 0) >= 6 && /[A-Z]/.test(password) && /\d/.test(password) && /[\W_]/.test(password),
        });
    }, [password]);

    return (
        isTouched && (
            <Text size="2" color="gray" className="mt-2">
                <ul className="list-disc pl-4 text-[12px]">
                    <li className={passwordConditions.minLength ? 'text-green-500' : 'text-gray-500'}>
                        Password must be at least 6 characters long.
                    </li>
                    <li className={passwordConditions.hasUppercase ? 'text-green-500' : 'text-gray-500'}>
                        Password must contain at least one uppercase letter.
                    </li>
                    <li className={passwordConditions.hasNumber ? 'text-green-500' : 'text-gray-500'}>
                        Password must contain at least one number.
                    </li>
                    <li className={passwordConditions.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}>
                        Password must contain at least one special character (e.g., !@#$%^&*).
                    </li>
                </ul>
            </Text>
        )
    );
};
