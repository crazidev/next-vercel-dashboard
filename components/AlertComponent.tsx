import { Callout, Flex } from "@radix-ui/themes"
import { MdErrorOutline, MdWarning } from "react-icons/md";
import { TbInfoCircle } from "react-icons/tb"
import { Op } from "sequelize";
import { authUser } from "@/actions/authUser";
import getSequelizeInstance from "@/database/db"
import { Alert } from "@/database/models/alert";

export const AlertComponent = async () => {
    await getSequelizeInstance();
    var generalAlerts: Alert[] = [];
    var userAlerts: Alert[] = [];

    var user_id = (await authUser())?.user_id;
    const now = new Date();

    var where = {
        [Op.and]: [
            {
                startAt: { [Op.or]: [{ [Op.lte]: now }, { [Op.is]: null }] }
            },
            {
                endAt: { [Op.or]: [{ [Op.gte]: now }, { [Op.is]: null }] }
            }
        ]
    }

    generalAlerts = await Alert.findAll({
        where: {
            userId: null,
            ...where
        }
    });

    if (user_id) {
        userAlerts = await Alert.findAll({
            where: {
                userId: user_id,
                ...where
            }
        });
    }
    var allAlerts = [...generalAlerts, ...userAlerts];

    const getColor = (type: typeof Alert.prototype.type) => {
        switch (type) {
            case "error":
                return "red"
            case "warning":
                return "yellow"
            default:
                return "green";
        }
    }

    return <Flex className="mb-3" direction={"column"}>
        {allAlerts.map((alert) => <Callout.Root key={alert.id} className="gap-0 gap-x-2 mt-0 mb-3" variant="surface" color={getColor(alert.type)} mt={"5"} size={"1"}>
            <Callout.Icon>
                {alert.type === "info" && <TbInfoCircle />}
                {alert.type === "error" && <MdErrorOutline />}
                {alert.type === "warning" && <MdWarning />}
            </Callout.Icon>
            <Callout.Text className="font-bold">{alert.title}</Callout.Text>
            <Callout.Text>{alert.message}</Callout.Text>
        </Callout.Root>)}</Flex>
}