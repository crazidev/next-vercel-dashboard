import { cFmt } from "@/lib/cFmt";
import {
  ScrollArea,
  IconButton,
  Text,
  Flex,
  Heading,
  Badge,
} from "@radix-ui/themes";
import { TbChartLine, TbChevronsDown, TbSearch } from "react-icons/tb";
import { InferAttributes, Op, WhereOptions } from "sequelize";
import { authUser } from "@/actions/authUser";
import getSequelizeInstance from "@/database/db";
import { Transactions } from "@/database/models/transactions";
import { Users } from "@/database/models/users";
import { Wallets } from "@/database/models/wallets";
import Image from "next/image";
import { WalletAddSvg, WalletMinusSvg } from "./icons/SvgIcons";
import { twMerge } from "tailwind-merge";
import { TransactionComponent } from "./TransactionComponent";
import { getMainWallet } from "@/lib/getMainWallet";

export const TransactionList = async ({
  wallet: wallet_shortname,
  user_id,
  type,
  offset,
  limit,
  search,
  useTableLayout,
}: {
  wallet?: any;
  user_id?: number;
  type?: "full" | "compact";
  offset?: number | 1;
  limit?: number | 15;
  search?: any;
  useTableLayout?: boolean;
}) => {
  var user = await authUser();
  await getSequelizeInstance();

  var where: WhereOptions<InferAttributes<Transactions, { omit: never }>> = {
    [Op.or]: {
      userId: user.user_id,
      beneficiaryId: user.user_id,
    },
  };

  if (wallet_shortname == "main") {
    // @ts-ignore
    where.walletId = null as any;
  } else if (wallet_shortname !== undefined) {
    where = {
      [Op.or]: {
        userId: user.user_id,
        beneficiaryId: user.user_id,
      },
      [Op.not]: {
        walletId: null as any,
      },
    };
  }
  if (search) {
    where = {
      [Op.and]: {
        ...where,
        narration: {
          [Op.like]: `%${search}%`,
        },
      },
    };
  }

  console.log(where);

  var list = await new Promise<Transactions[]>(async (resolve) => {
    var data = await Transactions.findAll({
      where: where,
      limit: type == "compact" ? 5 : limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          as: "beneficiary",
        },
        {
          model: Wallets,
          as: "wallet",
          where:
            wallet_shortname && wallet_shortname != "main"
              ? {
                  shortName: wallet_shortname,
                }
              : undefined,
        },
      ],
    });
    // setTimeout(() => {
    resolve(data);
    // }, 0 * 1000);
  });

  var formattedList = list.map((e) => {
    var data = e.toJSON();

    if (!data.wallet) {
      data.wallet = getMainWallet();
    }

    return data;
  });

  // const groupedData = groupTransactionsByDate(list);
  // logger(groupedData);

  return (
    <div className="">
      {formattedList.length == 0 && (
        <div className="flex flex-col justify-center items-center mx-auto mt-[50px] w-full text-center">
          {!search ? (
            <div className="">
              <TbChartLine size={50} className="text-primary-600" />
              <Heading size={"2"}>Oops! No Transaction yet</Heading>
              <Text color="gray" size={"1"}>
                Come back later after you've made a transactions.
              </Text>
            </div>
          ) : (
            <>
              <TbSearch size={50} className="text-primary-600" />
              <Heading size={"2"}>No search result</Heading>
              <Text color="gray" size={"1"}>
                {/* TODO: No search description */}
              </Text>
            </>
          )}
        </div>
      )}
      <table
        className={`${
          useTableLayout ? "lg:table-auto" : "table-fixed"
        }  border-separate border-spacing-y-[10px] w-[100%] max-w-[100%] overflow-x-scroll lg:table-auto`}
      >
        <tbody>
          {formattedList.map((item) => {
            return <TransactionComponent item={item} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
