import OneSignal, { IInitObject } from "react-onesignal";


export const InitOneSignal = async (options: IInitObject) =>
  await OneSignal.init({
    ...options,
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID ?? "",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  });
