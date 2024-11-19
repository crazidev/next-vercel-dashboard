"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import getSequelizeInstance from "@/database/db";
import { authUser } from "../authUser";
import { redirect, RedirectType } from "next/navigation";
import { Users } from "@/database/models/users";
import { uploadFileToCloudinary } from "../../extra/upload_cloudinary";

export async function submitAddress(formData: any) {
  try {
    await getSequelizeInstance();
    var user_id = (await authUser()).user_id;

    if (user_id) {
      await Users.update(
        {
          address: formData.address,
          state: formData.state,
          country: formData.country,
        },
        {
          where: {
            id: user_id,
          },
        }
      );

      return {
        success: true,
        message: "Address updated Successful",
      };
    } else {
      throw { message: "User does not exist" };
    }
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        root: error?.message ?? "Internal server error",
      },
    };
  }
}

export async function submitIdCard(formData: any) {
  try {
    await getSequelizeInstance();
    var user_id = (await authUser()).user_id;
    var file = formData.id_front[0];

    console.log(user_id);
    if (user_id) {
      var upload = await uploadFileToCloudinary({
        file: file,
        folder: "images/",
      });

      if (!upload.isSuccess) {
        throw { message: "Error while uploading image" };
      }

      await Users.update(
        {
          idDoc: upload.url,
          idDocStatus: "uploaded",
          idDocType: formData.id_type,
        },
        {
          where: {
            id: user_id,
          },
        }
      );
      return {
        success: true,
        message: "ID document updated Successful",
      };
    } else {
      throw { message: "User does not exist" };
    }
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        root: error?.message ?? "Internal server error",
      },
    };
  }
}


export async function submitSSN(formData: any) {
  try {
    await getSequelizeInstance();
    var user_id = (await authUser()).user_id;

    if (user_id) {
      await Users.update(
        {
          ssn: formData.ssn_number,
          ssnStatus: "uploaded",
        },
        {
          where: {
            id: user_id,
          },
        }
      );
      return {
        success: true,
        message: "SSN updated Successful",
      };
    } else {
      throw { message: "User does not exist" };
    }
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        root: error?.message ?? "Internal server error",
      },
    };
  }
}

