import { InferAttributes } from "sequelize"
import { Users } from "@/database/models/users"

export const RegistrationMail = (user: InferAttributes<Users>) => {
    throw new Error("");

    return <>Hello world!</>
}

export default RegistrationMail;