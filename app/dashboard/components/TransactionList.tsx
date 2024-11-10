import { cFmt } from "@/lib/currency-formatter";
import {
  ScrollArea,
  Avatar,
  IconButton,
  Text,
  Badge,
  Flex,
} from "@radix-ui/themes";
import { Timer } from "lucide-react";
import { MdPendingActions } from "react-icons/md";
import {
  TbCheck,
  TbChevronsDown,
  TbChevronsUp,
  TbInfoCircle,
  TbSandbox,
} from "react-icons/tb";
import { Op } from "sequelize";
import { authUser } from "server/actions/authUser";
import getSequelizeInstance from "server/database/db";
import { Transactions } from "server/database/models/transactions";
import { Users } from "server/database/models/users";

export const TransactionList = async ({
  wallet_id,
  user_id,
}: {
  wallet_id?: number;
  user_id?: number;
}) => {
  var user = authUser();
  await getSequelizeInstance();

  var list = await new Promise<Transactions[]>(async (resolve) => {
    var data = await Transactions.findAll({
      where: {
        // userId: user_id ?? user.user_id,
        [Op.and]: [
          wallet_id === undefined
            ? {}
            : {
                walletId: wallet_id,
              },
        ],
      },
      include: [
        {
          model: Users,
          as: "beneficiary",
        },
      ],
    });
    setTimeout(() => {
      resolve(data);
    }, 0 * 1000); // 3000 milliseconds = 3 seconds
  });

  return (
    <ScrollArea className="">
      <table className="w-[100%] max-w-[100%] table-fixed border-separate border-spacing-y-[10px] overflow-x-scroll lg:table-auto">
        <tbody>
          {list.map((item) => (
            <tr
              key={item.id}
              className="mb-3 border-b-2 border-primary-200 flex h-[65px] cursor-pointer items-center dark:bg-card-background bg-[var(--accent-a3)] py-2 backdrop-blur-sm transition-colors duration-300 hover:bg-[var(--accent-3)] md:table-row"
            >
              {/* Status Icon */}
              <td className="w-[50px]">
                <IconButton
                  variant="soft"
                  size="1"
                  radius="full"
                  className="mx-2 text-lg"
                >
                  {item.beneficiaryId !== user.user_id ? (
                    <TbChevronsUp />
                  ) : (
                    <TbChevronsDown />
                  )}
                </IconButton>
              </td>

              {/* Narration */}
              <td className="flex-1 overflow-hidden text-nowrap">
                <Text
                  className="truncate text-ellipsis pr-[20px]"
                  as="div"
                  size="2"
                >
                  {item.narration}
                </Text>
                <div className="flex items-end gap-2 lg:hidden">
                  <div>
                    <Badge
                      size="1"
                      className="text-[10px] capitalize"
                      color="blue"
                    >
                      {item.paymentMethod.replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <Text
                    as="div"
                    size="1"
                    className="text-[10px] text-[var(--gray-9)]"
                  >
                    {item.createdAt?.toLocaleDateString()}
                  </Text>
                </div>
              </td>

              {/* Date */}
              <td className="hidden lg:table-cell">
                <Text className="text-[13px] text-[var(--gray-9)]">
                  {item.createdAt?.toLocaleDateString()}
                </Text>
              </td>

              {/* Payment Method */}
              <td className="hidden lg:table-cell">
                <Badge size="1" className="capitalize" color="blue">
                  {item.paymentMethod.replaceAll("_", " ")}
                </Badge>
              </td>

              {/* Amount */}
              <td className="whitespace-nowrap text-right">
                <Flex direction="column" className="mx-2">
                  <Text
                    size="2"
                    as="div"
                    color={
                      item.beneficiaryId === user.user_id ? "green" : "red"
                    }
                    className="font-mono"
                  >
                    {cFmt({ amount: item.amount })}
                  </Text>
                  <div>
                    <Badge
                      size="1"
                      className="text-[10px]"
                      color={item.status === "completed" ? "green" : "yellow"}
                    >
                      {item.status === "completed" ? "Successful" : "Pending"}
                    </Badge>
                  </div>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};
