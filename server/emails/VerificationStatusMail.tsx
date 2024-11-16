import { InferAttributes } from "sequelize"
import { Users } from "@/database/models/users"

export const VerificationStatusMail = (user: InferAttributes<Users>) => {
    throw new Error("");
    return <>Hello world!</>
}

export default VerificationStatusMail;