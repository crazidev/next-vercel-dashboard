import { TawkAPI } from "type/Tawk";

declare global {
  interface Window {
    // Configuration Variables
    $_Tawk_AccountKey?: string;
    $_Tawk_WidgetId?: string;
    $_Tawk_Unstable?: boolean;
    $_Tawk?: TawkAPI;

    // Main API Objects
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;

    // Additional Configuration
    Tawk_SecureMode?: boolean;
  }
}

export {};
