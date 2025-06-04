"use client";

import { MyDialog } from "@/components/MyDialog";
import {
  Card,
  Flex,
  Badge,
  Button,
  Text,
  IconButton,
  Select,
  Link,
  Callout,
} from "@radix-ui/themes";
import { CountrySelectComponent } from "@/components/CountrySelectComponent";
import { CTextField } from "@/components/CTextField";
import { MdEdit, MdInfo, MdLocationCity, MdLocationPin } from "react-icons/md";
import {
  submitAddress,
  submitIdCard,
  submitSSN,
} from "@/actions/auth/verification";
import { useForm } from "react-hook-form";
import yup from "@/server/extra/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { triggerEsc } from "@/lib/triggerEsc";
import { toast } from "sonner";
import { revalidateUserTag } from "@/fetch/fetch_user";

export function VerificationComponent({
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

  const ssnValidator = useForm({
    resolver: yupResolver(ssnScheme),
  });

  var formState2 = idValidator.formState;

  let myFunction = function () {};
  let myFunction2 = function () {};
  let myFunction3 = function () {};

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
                <Text size={"1"} className="capitalize mt-1">
                  Status:{" "}
                  <Badge
                    size={"1"}
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
                // TODO fix this
                // closeDialogProp={(closeDialog) => {
                //   myFunction = closeDialog;
                //   myFunction2 = closeDialog;
                //   myFunction3 = closeDialog;
                // }
                // }
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
                            defaultValue={d.content.type ?? ""}
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
                              className="font-normal text-[11px] italic normal-case"
                              color="red"
                            >
                              {formState2.errors.id_type?.message}
                            </Text>
                          )}

                          <Card>
                            <CTextField
                              label="Front side of ID Card"
                              placeholder=""
                              accept=".png, .jpeg, .jpg"
                              type={"file"}
                              register={idValidator.register("id_front")}
                              error={
                                idValidator.formState.errors?.id_front?.message
                              }
                            />
                            {d.content.link && (
                              <img
                                alt="id_front"
                                className="pt-2 h-[100px]"
                                src={d.content.link}
                              />
                            )}
                          </Card>

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
                    {d.type === "ssn" && (
                      <form
                        onSubmit={ssnValidator.handleSubmit(async (data) => {
                          var d = await submitSSN(data);
                          if (d.success) {
                            triggerEsc();
                            toast.success(d.message);
                            revalidateUserTag();
                            props.refresh?.();
                          } else {
                            toast.error(d.errors?.root);
                          }
                        })}
                      >
                        <Flex direction={"column"} gap={"2"}>
                          <Callout.Root
                            variant="surface"
                            color="green"
                            mb={"2"}
                            size={"1"}
                          >
                            <Callout.Icon>
                              <MdInfo />
                            </Callout.Icon>
                            <Callout.Text size={"1"}>
                              If you do not have a Social Security Number (SSN),
                              we advice you to visit{" "}
                              <Link color="blue">abroadssn.us</Link> to enroll.
                            </Callout.Text>
                          </Callout.Root>

                          <CTextField
                            label="Social Security Number"
                            placeholder="Social Security Number"
                            type={"text"}
                            defaultValue={d.content ?? ""}
                            register={ssnValidator.register("ssn_number")}
                            error={
                              ssnValidator.formState.errors?.ssn_number?.message
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
              <div>
                {d.type === "address" && (
                  <Text
                    size={"1"}
                    className="line-clamp-1 text-[10px] text-gray-500"
                  >
                    {d.content}
                  </Text>
                )}
              </div>
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
    content?: any;
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
