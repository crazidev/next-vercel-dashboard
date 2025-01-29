"use client";

import { CTextField } from "@/components/CTextField";
import { IconButton } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";


export const SearchInput = ({
    placeholder,
    onClick,
    onChanged,
    onSubmit
}: {
    placeholder: any,
    onClick?: () => void,
    onChanged?: (value: {
        path?: string,
        value?: string
    }) => void,
    onSubmit?: (value: {
        path?: string,
        value?: string
    }) => void
}) => {
    var router = useRouter();
    var pathName = usePathname().split('?').at(0);
    var searchParam = useSearchParams();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        setValue('search', searchParam.get('q'));
    }, [searchParam.get('q')])

    return <form onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit)
            onSubmit({
                path: pathName,
                value: getValues('search')
            });
    }}>
        <CTextField
            placeholder={placeholder}
            leftIcon={<Search size={15} className="mx-1" />}
            className="!h-[45px] md:h-[45px]"
            onChange={(e) => {
                if (onChanged)
                    onChanged({
                        path: pathName,
                        value: e.target.value
                    });
            }}
            // type={'search'}
            // onKeyUp={(e) => {
            //     setSearch(e.currentTarget.value);
            // }}
            onClick={onClick}
            rightIcon={(getValues('search') || searchParam.get('q')) && <IconButton variant="soft" color="gray" type="reset" onClick={() => {
                reset();
                if (onSubmit)
                    onSubmit({
                        path: pathName,
                        value: undefined
                    });
            }}><MdCancel /></IconButton>}
            error={errors?.search?.message as any}
            register={register("search")}
        />
    </form>
}