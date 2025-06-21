"use server";

import getSequelizeInstance from "@/database/db";
import { Users } from "@/database/models/users";
import { revalidatePath } from "next/cache";

export async function update_kyc_status_action(form: any, user_id: number) {
  try {
    var t = await (await getSequelizeInstance()).transaction();
    await Users.update(
      {
        status: form.status,
        accountLevel: form.accountLevel,
        emailVerified: form.emailVerified == "verified" ? 1 : 0,
        canTransfer: form.canTransfer == "yes" ? 1 : 0,
        ssn: form.ssn == "" ? null : form.ssn,
        accountNumber: form.accountNumber,
        routingNumber: form.routingNumber,
        ssnStatus: form.ssnStatus == "none" ? null : form.ssnStatus,
        idDocStatus: form.idDocStatus == "none" ? null : form.idDocStatus,
        idDocType: form.idDocType == "none" ? null : form.idDocType,
      },
      {
        where: {
          id: user_id,
        },
        transaction: t,
      }
    );

    await t.commit();
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "KYC status updated Successfully",
    };
  } catch (error) {
    await t.rollback();
    console.error(error);
    return {
      error: "Internal server error",
    };
  }
}
