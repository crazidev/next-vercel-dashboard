'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import CryptoConvert from "crypto-convert";

// Define the context and types
interface CryptoConvertContextType {
    convert: CryptoConvert | null;
}

export const CryptoConvertContext = createContext<CryptoConvertContextType | undefined>(undefined);

// Provider component
export const CryptoConvertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [convert, setConvert] = useState<CryptoConvert | null>(null);

    useEffect(() => {
        if (!convert) {
            try {
                const cryptoConvertInstance = new CryptoConvert();
                setConvert(cryptoConvertInstance);
            } catch (error) {
                console.error("Unable to initialize CryptoConvert", error);
            }
        }
    }, [convert]);

    return (
        <CryptoConvertContext.Provider value={{ convert }}>
            {children}
        </CryptoConvertContext.Provider>
    );
};

// Custom hook to use the CryptoConvert context
export const useCryptoConvert = (): CryptoConvertContextType => {
    const context = useContext(CryptoConvertContext);
    if (!context.convert) {
        throw new Error('useCryptoConvert must be used within a CryptoConvertProvider');
    }
    return context;
};
