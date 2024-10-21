"use client";

import { MyDialog } from "@/components/my_dialog";
import { Card, Flex, Badge, Button, Text } from "@radix-ui/themes";
import { VerificationDialog } from "./verification_dialog";
import { CountrySelectComponent } from "../components/country_select_button";
import { CTextField } from "@/components/text-field";
import { MdLocationCity, MdLocationPin } from "react-icons/md";
import { useForm } from "react-hook-form";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";

export function VerificationComponent({
  props,
}: {
  props: VerificationComponentProp;
}) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addressScheme),
  });

  return (
    <>
      {props.list.map((d) => (
        <Card key={d.title} variant={"surface"} className="mt-[10px] py-22">
          <Flex direction={"column"}>
            <Text weight={"bold"} size={"1"}>
              {d.title}
            </Text>
            <Text size={"1"} className=" capitalize ">
              Status: <Badge color={"gray"}>{d.status.replace("_", " ")}</Badge>
            </Text>
            <MyDialog
              props={{
                title: "Resident Address",
                description: "",

                trigger: (
                  <Button
                    variant="ghost"
                    className="mt-1 text-primary-600"
                    size={"1"}
                  >
                    Start Verification
                  </Button>
                ),
                children: (
                  <>
                    {d.type === "address" && (
                      <form
                        onSubmit={handleSubmit((data) => {
                          alert(data);
                        })}
                      >
                        <Flex direction={"column"} gap={"2"}>
                          <CountrySelectComponent onChanged={(value)=> setValue("country", value)} error={errors?.country?.message} />
                          <CTextField
                            label="State"
                            placeholder="Ex: New York"
                            leftIcon={<MdLocationCity />}
                            register={register("state")}
                            error={errors?.state?.message}
                          />
                          <CTextField
                            label="Address"
                            placeholder="Ex: No 1 Resident Street, New York"
                            leftIcon={<MdLocationPin />}
                            register={register("address")}
                            error={errors?.address?.message}
                          />
                          <Button mt='3' type='submit' loading={isSubmitting}>Submit</Button>
                        </Flex>
                      </form>
                    )}
                  </>
                ),
              }}
            />
          </Flex>
        </Card>
      ))}
    </>
  );
}

interface VerificationComponentProp {
  list: {
    title: string;
    type: "ssn" | "id_card" | "address";
    status: "not_uploaded" | "uploaded" | "verified";
  }[];
}

const addressScheme = yup.object({
  country: yup.string().required(),
  state: yup.string().required(),
  address: yup.string().required(),
});
