import OneSignal, { IInitObject } from "react-onesignal";

export const InitOneSignal = async (options?: IInitObject) => {
  return await OneSignal.init({
    ...options,
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID ?? "",
    notifyButton: {
      enable: true,
    },
    promptOptions: {
      customlink: {
        enabled: true,
        style: "button",
        size: "medium",
        color: {
          button: "#E12D30",
          text: "#FFFFFF",
        },
        text: {
          subscribe: "Subscribe to push notifications",
          unsubscribe: "Unsubscribe from push notifications",
        },
        unsubscribeEnabled: false,
      },
    },
    allowLocalhostAsSecureOrigin: true,
    serviceWorkerPath: "OneSignalSDKWorker.js",
  });
};
