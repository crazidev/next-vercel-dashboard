import { CTextField } from "@/components/CTextField";
import { Select, Text } from "@radix-ui/themes";
import { MdFlag } from "react-icons/md";
import countries from "@/lib/country_list.json";

export function CountrySelectComponent({
  error,
  onChanged,
}: {
  error?: string;
  onChanged: (value: string) => void;
}) {
  return (
    <>
      <Text size={"1"} weight={"medium"} ml={"1"}>
        Country
      </Text>
      <Select.Root onValueChange={onChanged}>
        <Select.Trigger className="h-[37px]" placeholder="Select Country" />
        <Select.Content position="popper">
          <Select.Group>
            {countries.map((country) => (
              <Select.Item key={country.code} value={country.name}>{country.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {error && (
        <Text
          ml={"2"}
          className="text-[11px] font-normal italic normal-case"
          color="red"
        >
          {error}
        </Text>
      )}
    </>
  );
}
