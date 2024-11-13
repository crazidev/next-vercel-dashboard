const fs = require("node:fs");
const path = require("node:path");
const pwaAssetGenerator = require("pwa-asset-generator");
const rootDir = path.join(__dirname, "../");

// Generate images over a module function call, instead of using CLI commands
(async () => {
  try {
    // GENERATE IOS SPLASH
    const { htmlMeta: iosSplashMeta, manifestJsonContent: iosSplashManifest } =
      await pwaAssetGenerator.generateImages("public/logo.png", "public/pwa", {
        background: "white",
        pathOverride: "/pwa",
        portraitOnly: true,
        splashOnly: true,
        quality: 100,
        padding: "60%",
        log: true,
        xhtml: true,
      });

    // GENERATE OTHERS (Icons)
    const { htmlMeta: iconOnlyMeta, manifestJsonContent: iconOnlyManifest } =
      await pwaAssetGenerator.generateImages("public/logo.png", "public/pwa", {
        background: "white",
        pathOverride: "/pwa",
        quality: 70,
        maskable: true,
        padding: "10%",
        iconOnly: true,
        log: true,
        mstile: true,
        favicon: true,
        xhtml: true,
      });

    // Save generated manifest as JSON
    await fs.promises.writeFile(
      path.join(rootDir, "/public/pwa/icons.json"),
      JSON.stringify([...iosSplashManifest, ...iconOnlyManifest], null, 2)
    );

    // Generate PWARelatedLinks.tsx file content
    let str = `
      export const PWARelatedLinks = () => {
        return (
          <>
            ${iconOnlyMeta.favicon ? `${iconOnlyMeta.favicon}\n` : ""}
            ${iconOnlyMeta.msTileImage ? `${iconOnlyMeta.msTileImage}\n` : ""}
            ${
              iosSplashMeta.appleTouchIcon
                ? `${iosSplashMeta.appleTouchIcon}\n`
                : ""
            }
            ${
              iosSplashMeta.appleLaunchImage
                ? `${iosSplashMeta.appleLaunchImage}\n`
                : ""
            }
            ${
              iosSplashMeta.appleMobileWebAppCapable
                ? `${iosSplashMeta.appleMobileWebAppCapable}\n`
                : ""
            }
          </>
        );
      };
    `;

    // Write the PWARelatedLinks component to the .tsx file
    await fs.promises.writeFile(
      path.join(rootDir, "/app/PWARelatedLinks.tsx"),
      str.trim()
    );

    console.log(
      "Splash manifest and PWARelatedLinks.tsx created successfully!"
    );
  } catch (err) {
    console.error("Error generating assets or saving files:", err);
  }

  // Exit the process after task completion
  process.exit();
})();

module.exports.appleDeviceSpecsForLaunchImages =
  pwaAssetGenerator.appleDeviceSpecsForLaunchImages;
