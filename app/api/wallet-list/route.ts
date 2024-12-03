import { fetchUserWallets } from "../../../server/fetch/fetch_wallets";
import { validateJWT } from "../../../server/extra/jwt_helper";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(request: Request) {
  try {
    var token = parseCookie(request.headers.get("cookie")).get("token");

    var user = validateJWT(token);
    // console.log(user.userId);
    var data = await fetchUserWallets(user.userId);

    return new Response(JSON.stringify({ data }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
