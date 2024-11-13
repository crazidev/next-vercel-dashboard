import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "";

export function authUser(re_direct?: boolean) {
  var token = cookies().get("token")?.value;
  try {
    if (token !== undefined && token !== "") {
      var user = jwt.verify(token!, JWT_SECRET) as any;
      return {
        isAuth: true,
        user_id: user.userId ?? -1,
      };
    } else {
      throw {
        isAuth: false,
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
    };
  }
}
