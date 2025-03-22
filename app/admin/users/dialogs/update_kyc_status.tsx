'use client';

import { change_password_action } from "@/actions/admin/change_password_action";
import { update_kyc_status_action } from "@/actions/admin/update_kyc_status_action";
import { CTextField } from "@/components/CTextField";
import { MyDialog } from "@/components/MyDialog";
import { Users } from "@/database/models/users";
import yup from "@/server/extra/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Select, Separator, Text } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateKYCDialog({ user, isOpen, setIsOpen }: { user: Users, isOpen: boolean, setIsOpen: (boolean) => void }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(yup.object({
            status: yup.string().oneOf(['active', 'blocked', 'suspended']).default('active').required(),
            accountLevel: yup.string().oneOf(['tier1', 'tier2', 'tier3']).default('tier1').required(),
            emailVerified: yup.string().oneOf(['pending', 'verified']).default('pending').required(),
            canTransfer: yup.string().oneOf(['no', 'yes']).default('no').required(),
            ssnStatus: yup.string().oneOf(['uploaded', 'verified', 'none']).default('none'),
            ssn: yup.string(),
            idDocType: yup.string().oneOf(['national_id', 'drivers_license', 'international_passport', 'none']).default('none'),
            idDocStatus: yup.string().oneOf(['uploaded', 'verified', 'none']).default('none'),
        }))
    });

    async function submit(data) {
        try {
            var res = await update_kyc_status_action(data, user.id);

            if (res.success) {
                toast.success(res.message);
                setIsOpen(false);
            } else {
                throw res;
            }
        } catch (error) {
            console.log(error);
            toast.error(res.error);
        }
    }


    useEffect(() => {
        if (isOpen) {
            setValue('ssn', user.ssn);
            setValue('ssnStatus', user.ssnStatus);

            setValue('emailVerified', user?.emailVerified == 1 ? 'verified' : 'pending');
            setValue('canTransfer', user?.canTransfer == 1 ? 'yes' : 'no');

            setValue('idDocType', user.idDocType);
            setValue('idDocStatus', user.idDocStatus);

            setValue('accountLevel', user.accountLevel);
            setValue('status', user.status);
        }

    }, [isOpen]);

    useEffect(() => {
        if (watch().ssnStatus == "none") {
            setValue('ssn', '');
        }
        if (watch().idDocStatus == 'none') {
            setValue('idDocType', 'none');
        }

    }, [watch().idDocStatus, watch().ssnStatus]);

    return (<
        MyDialog title={"Update KYC Status"}
        description={""}
        open={isOpen}
        maxWidth="500px"
        setIsOpen={setIsOpen}
        trigger={<div></div>}
        children={
            <form onSubmit={handleSubmit(submit)} className="w-full">
                <div className="gap-5 flex flex-col">
                    <Flex gap={'4'}>
                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >Account Status</Text>
                            <Select.Root value={watch().status} onValueChange={(value) => setValue('status', value as any)}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="active">Active</Select.Item>
                                    <Select.Item value="blocked">Blocked</Select.Item>
                                    <Select.Item value="suspended">Suspended</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.status?.message.toString()}</Text>
                        </Flex>
                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >Account Level</Text>
                            <Select.Root value={watch().accountLevel} onValueChange={(value) => setValue('accountLevel', value as any)}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="tier1">Tier 1</Select.Item>
                                    <Select.Item value="tier2">Tier 2</Select.Item>
                                    <Select.Item value="tier3">Tier 3</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.accountLevel?.message.toString()}</Text>
                        </Flex>
                    </Flex>

                    <Flex gap={'4'}>
                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >Email Status</Text>
                            <Select.Root value={watch().emailVerified} onValueChange={(value) => setValue('emailVerified', value as any)}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value={"pending"}>Not verified</Select.Item>
                                    <Select.Item value={"verified"}>Verified</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.emailVerified?.message.toString()}</Text>
                        </Flex>

                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >Can Transfer</Text>
                            <Select.Root value={watch().canTransfer} onValueChange={(value) => setValue('canTransfer', value as any)}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value={"no"}>No</Select.Item>
                                    <Select.Item value={"yes"}>Yes</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.canTransfer?.message.toString()}</Text>
                        </Flex>
                    </Flex>


                    <Flex gap={'4'}>
                        <Flex direction="column" gap="1" className="w-full mt-1">
                            <Text size={'1'} >SSN Status</Text>
                            <Select.Root value={getValues('ssnStatus')} onValueChange={(value) => setValue('ssnStatus', value as any)}>
                                <Select.Trigger placeholder="Select SSN Status" />
                                <Select.Content>
                                    <Select.Item value={'none'}>--</Select.Item>
                                    <Select.Item value="uploaded">Uploaded</Select.Item>
                                    <Select.Item value="verified">Verified</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.ssnStatus?.message.toString()}</Text>
                        </Flex>
                        <Flex direction="column" gap="1" className="w-full">
                            <CTextField
                                label={`SSN`}
                                disabled={watch().ssnStatus == null}
                                placeholder="SSN"
                                error={errors?.ssn?.message.toString()}
                                register={register("ssn")}
                            />
                        </Flex>
                    </Flex>
                    <Flex gap={'4'}>
                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >ID Status</Text>
                            <Select.Root value={getValues('idDocStatus')} onValueChange={(value) => setValue('idDocStatus', value as any)}>
                                <Select.Trigger placeholder="Select ID Status" />
                                <Select.Content>
                                    <Select.Item value={'none'}>--</Select.Item>
                                    <Select.Item value="uploaded">Uploaded</Select.Item>
                                    <Select.Item value="verified">Verified</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.idDocStatus?.message.toString()}</Text>

                        </Flex>
                        <Flex direction="column" gap="1" className="w-full">
                            <Text size={'1'} >ID Type</Text>
                            <Select.Root value={getValues('idDocType')} onValueChange={(value) => setValue('idDocType', value as any)}>
                                <Select.Trigger placeholder="Select ID Type" />
                                <Select.Content>
                                    <Select.Item value={'none'}>--</Select.Item>
                                    <Select.Item value="drivers_license">Drivers License</Select.Item>
                                    <Select.Item value="international_passport">International Passport</Select.Item>
                                    <Select.Item value="national_id">National ID</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            <Text size={'1'} color="red">{errors?.idDocStatus?.message.toString()}</Text>
                        </Flex>
                    </Flex>
                </div>


                <div className="w-full">
                    <Button loading={isSubmitting} size={'3'} type="submit" className="mt-5 w-full">Submit</Button>
                </div>
            </form>
        }
    />);
}

// <CTextField
// label="Front side of ID Card"
// placeholder=""
// accept=".png, .jpeg, .jpg"
// type={"file"}
// register={idValidator.register("id_front")}
// error={
//   idValidator.formState.errors?.id_front?.message
// }
// />
// {d.content.link && (
// <img
//   className="pt-2 h-[100px]"
//   src={d.content.link}
// />
// )}
