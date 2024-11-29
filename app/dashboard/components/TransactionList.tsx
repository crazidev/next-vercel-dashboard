import { cFmt } from "@/lib/cFmt";
import {
  ScrollArea,
  Avatar,
  IconButton,
  Text,
  Badge,
  Flex,
  Heading,
} from "@radix-ui/themes";
import { Timer } from "lucide-react";
import { MdPendingActions } from "react-icons/md";
import {
  TbChartLine,
  TbCheck,
  TbChevronsDown,
  TbChevronsUp,
  TbInfoCircle,
  TbMoodEmpty,
  TbSandbox,
  TbSearch,
} from "react-icons/tb";
import { InferAttributes, Op, WhereOptions } from "sequelize";
import { authUser } from "@/actions/authUser";
import getSequelizeInstance from "@/database/db";
import { Transactions } from "@/database/models/transactions";
import { Users } from "@/database/models/users";
import { WalletBalances } from "@/database/models/wallet_balances";
import { Wallets } from "@/database/models/wallets";
import { groupTransactionsByDate } from "@/lib/groupTransactionByData";

export const TransactionList = async ({
  wallet: wallet_shortname,
  user_id,
  type,
  offset,
  limit,
  search,
  useTableLayout
}: {
  wallet?: any;
  user_id?: number;
  type?: 'full' | 'compact',
  offset?: number | 1,
  limit?: number | 15,
  search?: any,
  useTableLayout?: boolean

}) => {
  var user = (await authUser());
  await getSequelizeInstance();

  var where: WhereOptions<InferAttributes<Transactions, { omit: never; }>> = {};
  if (wallet_shortname == 'main') {
    where.walletId = (null as any);
  } else if (wallet_shortname !== undefined) {
    where = {
      [Op.not]: {
        walletId: (null as any)
      }
    }
  }
  if (search) {
    where = {
      [Op.and]: {
        ...where,
        narration: {
          [Op.like]: `%${search}%`
        },
      }
    }
  }

  var list = await new Promise<Transactions[]>(async (resolve) => {
    var data = await Transactions.findAll({
      where: where,
      limit: type == 'compact' ? 5 : limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Users,
          as: "beneficiary",
        },
        {
          model: Wallets,
          as: "wallet",
          where: (wallet_shortname && wallet_shortname != 'main') ? {
            shortName: wallet_shortname
          } : undefined
        }
      ],
    });
    // setTimeout(() => {
    resolve(data);
    // }, 0 * 1000);
  });

  // const groupedData = groupTransactionsByDate(list);
  // console.log(groupedData);


  return (
    <ScrollArea className="">
      {list.length == 0 && <div className="flex flex-col justify-center items-center mx-auto mt-[50px] w-full text-center">
        {!search ? <>
          <TbChartLine size={50} className="text-primary-600" />
          <Heading size={"2"}>Oops! No Transaction yet</Heading>
          <Text color="gray" size={'1'}>Come back later after you've made a transactions.</Text></> : <>
          <TbSearch size={50} className="text-primary-600" />
          <Heading size={"2"}>No search result</Heading>
          <Text color="gray" size={'1'}>
            {/* TODO: No search description */}
          </Text></>}
      </div>}
      <table className={`${useTableLayout ? 'lg:table-auto' : 'table-fixed'}  border-separate border-spacing-y-[10px] w-[100%] max-w-[100%] overflow-x-scroll lg:table-auto`}>
        <tbody>
          {list.map((item) => {
            // console.log(item.toJSON()); 
            return (
              <tr
                key={item.id}
                className="flex items-center border-card-background-light dark:border-card-background-dark bg-card-background-light hover:bg-[var(--accent-3)] dark:bg-card-background-dark backdrop-blur-sm mb-3 py-2 border-b-2 h-[65px] transition-colors duration-300 cursor-pointer md:table-row"
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
                <td className="flex-1 text-nowrap overflow-hidden">
                  <Text
                    className="pr-[20px] text-ellipsis truncate"
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
                        {item.wallet?.type ? item.wallet.name : item.paymentMethod.replaceAll("_", " ")}
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
                    {item.wallet?.type ? item.wallet.name : item.paymentMethod.replaceAll("_", " ")}
                  </Badge>
                </td>

                {/* Amount */}
                <td className="text-right whitespace-nowrap">
                  <Flex direction="column" className="mx-2">
                    <Text
                      size="2"
                      as="div"
                      color={item.beneficiaryId === user.user_id ? "green" : "red"}
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
            );
          })}
        </tbody>
      </table>
    </ScrollArea>
  );
};
