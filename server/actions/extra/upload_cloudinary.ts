import * as cloudinary from "cloudinary";
import crypto from "crypto";

export const uploadFileToCloudinary = async ({
  file,
  folder,
}: {
  file: File;
  folder: string;
}) => {
  return new Promise<{ isSuccess: boolean; url?: string; error?: string }>(
    async (resolve, reject) => {
      try {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: "image",
            use_asset_folder_as_public_id_prefix: true,
            folder: "hybank_new/" + folder,
          },
          (error, result) => {
            if (error) {
              // Handle upload error
              resolve({
                isSuccess: false,
                error: error.message,
              });
            } else {
              // Upload success
              resolve({
                isSuccess: true,
                url: result?.url,
              });
            }
          }
        );

        if (file && file instanceof Blob) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          stream.end(buffer); // Send the buffer to Cloudinary
        } else {
          resolve({
            isSuccess: false,
            error: "No file uploaded or invalid file type",
          });
        }
      } catch (error) {
        // Catch any additional errors
        reject({
          isSuccess: false,
          error: (error as Error).message,
        });
      }
    }
  );
};

const signCloudinaryUpload = () => {
  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    timestamp: timestamp,
  };

  var signature = cloudinary.v2.utils.api_sign_request(
    params,
    cloudinary.v2.config().api_secret!
  );

  return { timestamp, signature };
};
