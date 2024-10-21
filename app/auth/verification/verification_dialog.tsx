"use client";

import { CTextField } from "@/components/text-field";
import { Flex } from "@radix-ui/themes";
import { MdLocationCity, MdLocationPin } from "react-icons/md";
import { CountrySelectComponent } from "../components/country_select_button";

export function VerificationDialog({ type }: { type: "ssn" | "id_card" | "address" }) {
    return (
      <>
        {type === "address" && (
          <>
            <Flex direction={"column"} gap={"2"}>
              <CountrySelectComponent />
              <CTextField
                label="State"
                placeholder="Ex: New York"
                leftIcon={<MdLocationCity />}
                // register={register("email")}
                // error={errors?.email?.message}
              />
              <CTextField
                label="Address"
                placeholder="Ex: No 1 Resident Street, New York"
                leftIcon={<MdLocationPin />}
                // register={register("email")}
                // error={errors?.email?.message}
              />
            </Flex>
          </>
        )}
      </>
    );
  }
  