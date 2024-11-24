import { CTextField } from '@/components/CTextField';
import { Button, Text, Heading } from '@radix-ui/themes';
import { MdPerson, MdOutlineMailLock } from 'react-icons/md';

interface CreateConversationBoxType {
    conversationExist: boolean,
    isSubmitting: boolean,
    register: any,
    errors: any
}

export const CreateConversationBox = ({ conversationExist, isSubmitting, register, errors }: CreateConversationBoxType) => {
    return <>
        {!conversationExist && <div className="flex flex-col `text-start">
            <Heading size={'5'}>Hello</Heading>
            <Text size={'1'}>Our support team is always available to help you through.</Text>
            <CTextField className="mt-[20px]" placeholder="Your Name" leftIcon={<MdPerson />} register={register("name")} error={errors.name?.message} />
            <CTextField className="mt-[10px]" placeholder="Your Email" leftIcon={<MdOutlineMailLock />} register={register("email")} error={errors.email?.message} />
            <Button loading={isSubmitting} type="submit" className="mt-[20px]" size={'3'}>Start Conversation</Button>
        </div>}</>
}
