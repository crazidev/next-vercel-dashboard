import { Transactions } from "@/database/models/transactions";
import { MyBarChart } from "./MyBarChart";
import { Users } from "@/database/models/users";
import { Wallets } from "@/database/models/wallets";
import { groupTransactionsByDate } from "@/lib/groupTransactionByData";
import { getMoment, momentInstance } from "@/lib/momentDateTime";
import { Op } from "sequelize";
import { Card, Text } from "@radix-ui/themes";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export async function WeeklyStats() {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const weekStart = getMoment().startOf("week").format(dateFormat);
    const weekEnd = getMoment().endOf("week").from(dateFormat);

    var list = await new Promise<Transactions[]>(async (resolve) => {
        var data = await Transactions.findAll({
            where: {
                // createdAt: {
                //     [Op.gte]: weekStart,
                //     [Op.lte]: weekEnd,
                // },
            },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Users,
                    as: "beneficiary",
                },
                {
                    model: Wallets,
                    as: "wallet",
                }
            ],
        });
        resolve(data);
    });

    const result: { [key: string]: { earning: number; spending: number } } = {};

    var daysOfWeek: typeof result = {
        Sun: { earning: 0, spending: 0 },
        Mon: { earning: 0, spending: 0 },
        Tue: { earning: 0, spending: 0 },
        Wed: { earning: 0, spending: 0 },
        Thu: { earning: 0, spending: 0 },
        Fri: { earning: 0, spending: 0 },
        Sat: { earning: 0, spending: 0 },
    }

    list.forEach((transaction) => {
        // Extract date (ignoring time) from createdAt
        const date = getMoment({ date: transaction.createdAt }).format('ddd');

        // Initialize the date group if not exists
        if (!daysOfWeek[date]) {
            daysOfWeek[date] = { earning: 0, spending: 0 };
        }

        // Classify transactions as earning or spending based on the status
        if (transaction.status === "completed") {
            daysOfWeek[date].earning += transaction.amount;
        } else if (transaction.status === "pending") {
            daysOfWeek[date].spending += transaction.amount;
        }
    });

    // Convert the result object to an array of objects
    var grouped = Object.keys(daysOfWeek).map((date) => ({
        label: date,
        earning: daysOfWeek[date].earning,
        spending: daysOfWeek[date].spending,
    }));

    return <Card>
        <CardHeader>
            <Text className="font-extrabold text-end" size={"3"}>
                Weekly Statistics
            </Text>
            <CardDescription className="text-left">{`Your weekly earning & spending\nstatistics.`}</CardDescription>
        </CardHeader>
        <MyBarChart data={grouped} />
    </Card>
}