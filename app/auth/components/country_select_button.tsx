import { CTextField } from "@/components/text-field";
import { Select, Text } from "@radix-ui/themes";
import { MdFlag } from "react-icons/md";
import countries from "@/lib/country_list.json";

export function CountrySelectComponent() {
  return (
    <>
      <Text size={"1"} weight={"medium"} ml={"1"}>
        Country
      </Text>
      <Select.Root>
        <Select.Trigger className="h-[37px]" placeholder="Select Country" />
        <Select.Content position="popper">
          <Select.Group>
            {countries.map((country) => (
              <Select.Item value={country.name}>{country.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}
