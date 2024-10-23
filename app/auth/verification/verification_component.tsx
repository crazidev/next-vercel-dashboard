"use client";

import { MyDialog } from "@/components/my_dialog";
import {
  Card,
  Flex,
  Badge,
  Button,
  Text,
  IconButton,
  Select,
} from "@radix-ui/themes";
import { CountrySelectComponent } from "../components/country_select_button";
import { CTextField } from "@/components/text-field";
import {
  MdEdit,
  MdEditDocument,
  MdLocationCity,
  MdLocationPin,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { submitAddress, submitIdCard } from "server/actions/auth/verification";
import { triggerEsc } from "@/lib/trigger_esc";
import { toast } from "sonner";
import { getUser, revalidateUserTag } from "server/fetch/select_user";
import { useState } from "react";

export async function VerificationComponent({
  props,
}: {
  props: VerificationComponentProp;
}) {
  const addressValidator = useForm({
    resolver: yupResolver(addressScheme),
  });

  const idValidator = useForm({
    resolver: yupResolver(idCardScheme),
  });

  var formState2 = idValidator.formState;

  let myFunction = function () {};

  return (
    <>
      {props.list.map((d) => (
        <Card key={d.title} variant={"surface"} className="mt-[10px] py-22">
          <Flex direction={"column"}>
            <Flex direction={"row"} justify={"between"}>
              <Flex direction={"column"}>
                <Text weight={"bold"} size={"1"}>
                  {d.title}
                </Text>
                <Text size={"1"} className=" capitalize ">
                  Status:{" "}
                  <Badge
                    color={
                      d.status === "verified"
                        ? "green"
                        : d.status == "not_uploaded"
                        ? "gray"
                        : "yellow"
                    }
                  >
                    {d.status.replace("_", " ")}
                  </Badge>
                </Text>
              </Flex>

              <MyDialog
                title={d.title}
                description={d.desc ?? ""}
                trigger={
                  d.status !== "verified" ? (
                    <IconButton onClick={() => {}} color="gray" size={"1"}>
                      <MdEdit />
                    </IconButton>
                  ) : (
                    <></>
                  )
                }
                closeDialogProp={(closeDialog) => {
                  myFunction = closeDialog;
                }}
                children={
                  <>
                    {d.type === "address" && (
                      <form
                        onSubmit={addressValidator.handleSubmit(
                          async (data) => {
                            var d = await submitAddress(data);

                            if (d.success) {
                              triggerEsc();
                              toast.success(d.message);
                              revalidateUserTag();
                              props.refresh?.();
                            } else {
                              toast.error(d.errors?.root);
                            }
                          }
                        )}
                      >
                        <Flex direction={"column"} gap={"2"}>
                          <CountrySelectComponent
                            onChanged={(value) => {
                              addressValidator.setError("country", {
                                message: "",
                              });
                              addressValidator.setValue("country", value);
                            }}
                            error={
                              addressValidator.formState.errors?.country
                                ?.message
                            }
                          />
                          <CTextField
                            label="State"
                            placeholder="Ex: New York"
                            leftIcon={<MdLocationCity />}
                            register={addressValidator.register("state")}
                            error={
                              addressValidator.formState.errors?.state?.message
                            }
                          />
                          <CTextField
                            label="Address"
                            placeholder="Ex: No 1 Resident Street, New York"
                            leftIcon={<MdLocationPin />}
                            register={addressValidator.register("address")}
                            error={
                              addressValidator.formState.errors?.address
                                ?.message
                            }
                          />
                          <Flex justify={"center"}>
                            <Button
                              mt="4"
                              className="min-w-[200] max-w-[300px]"
                              size={"2"}
                              type="submit"
                              loading={addressValidator.formState.isSubmitting}
                            >
                              Submit
                            </Button>
                          </Flex>
                        </Flex>
                      </form>
                    )}
                    {d.type === "id_card" && (
                      <form
                        onSubmit={idValidator.handleSubmit(async (data) => {
                          var d = await submitIdCard(data);
                          if (d.success) {
                            myFunction();
                            toast.success(d.message);
                            revalidateUserTag();
                            props.refresh?.();
                          } else {
                            toast.error(d.errors?.root);
                          }
                        })}
                      >
                        <Flex direction={"column"} gap={"2"}>
                          <Text size={"1"} weight={"medium"} ml={"1"}>
                            ID Type
                          </Text>
                          <Select.Root
                            onValueChange={(value) =>
                              idValidator.setValue("id_type", value)
                            }
                          >
                            <Select.Trigger
                              className="h-[37px]"
                              placeholder="Select Type"
                            />
                            <Select.Content position="popper">
                              <Select.Group>
                                <Select.Item value="national_id">
                                  National ID
                                </Select.Item>
                                <Select.Item value="drivers_license">
                                  Drivers License{" "}
                                </Select.Item>
                                <Select.Item value="international_passport">
                                  International Passport{" "}
                                </Select.Item>
                              </Select.Group>
                            </Select.Content>
                          </Select.Root>
                          {formState2.errors.id_type?.message && (
                            <Text
                              ml={"2"}
                              className="text-[11px] font-normal italic normal-case"
                              color="red"
                            >
                              {formState2.errors.id_type?.message}
                            </Text>
                          )}

                          <CTextField
                            label="ID Front"
                            placeholder=""
                            accept=".png, .jpeg, .jpg"
                            type={"file"}
                            register={idValidator.register("id_front")}
                            error={
                              idValidator.formState.errors?.id_front?.message
                            }
                          />

                          <Flex justify={"center"}>
                            <Button
                              mt="4"
                              className="min-w-[200] max-w-[300px]"
                              size={"2"}
                              type="submit"
                              loading={idValidator.formState.isSubmitting}
                            >
                              Submit
                            </Button>
                          </Flex>
                        </Flex>
                      </form>
                    )}
                  </>
                }
              />
            </Flex>

            {d.content && (
              <Text size={"1"} className="text-[10px] text-gray-500">
                {d.content}
              </Text>
            )}
          </Flex>
        </Card>
      ))}
    </>
  );
}

interface VerificationComponentProp {
  list: {
    title: string;
    content?: string;
    type: "ssn" | "id_card" | "address";
    status: "not_uploaded" | "uploaded" | "verified";
    desc?: string;
  }[];
  refresh?: () => void;
}

const addressScheme = yup.object({
  country: yup.string().required(),
  state: yup.string().required(),
  address: yup.string().required(),
});

const idCardScheme = yup.object({
  id_type: yup.string().required(),
  id_front: yup.mixed<File>().required(),
});

const ssnScheme = yup.object({
  ssn_number: yup.string().required(),
});
