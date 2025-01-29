"use client";

import { CTextField } from "@/components/CTextField";
import { MyDialog } from "@/components/MyDialog";
import { Users } from "@/database/models/users";
import { cFmt } from "@/lib/cFmt";
import { Badge, Button, Dialog, DropdownMenu, IconButton, Table, Text } from "@radix-ui/themes";
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { EyeIcon, Search } from "lucide-react";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { TbEdit, TbEditCircle } from "react-icons/tb";
import { InferAttributes } from "sequelize";
import { ProfileActionButton } from "./profile_action_button";


export default function UsersTable({ users }: { users: Users[] }) {
    const data: Users[] = users;
    const columnHelper = createColumnHelper<Users>();

    // Make some columns!
    const defaultColumns = [
        // Display Column
        columnHelper.display({
            id: 'actions',
            maxSize: 50,
            cell: props => <ProfileActionButton user={props.row.original} />
        }),
        // Grouping Column
        columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
            header: 'Full name',
            id: 'name',
            cell: props => (
                <div>
                    <div>
                        {props.getValue()}
                    </div>
                    <Badge
                        size="1"
                        className="text-[10px]"

                    >
                        ID: {props.row.original.id}
                    </Badge>
                </div>
            ),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            id: 'email',
            cell: props => {
                return <>
                    <div>
                        <div>
                            {props.getValue()}
                        </div>
                        <Badge
                            size="1"
                            className="text-[10px] mt-1"
                            color={props.row.original.emailVerified ? "green" : "yellow"}
                        >
                            {props.row.original.emailVerified ? "Verified" : "Not Verified"}
                        </Badge>
                    </div></>;
            },
        }),
        columnHelper.accessor('accountBalance', {
            header: 'Balance',
            id: 'balance',
            cell: info => <div className="font-mono">
                {cFmt({ amount: info.getValue() })}</div>,
        }),
        columnHelper.accessor(row => row.ssn, {
            id: 'ssn',
            header: 'SSN',
            cell: props => {
                var status = props.row.original.ssnStatus;
                var badgeColor = 'gray';
                var statusText = "Pending";
                if (status === "uploaded") {
                    badgeColor = 'yellow';
                    statusText = 'Uploaded'
                }
                if (status === "verified") {
                    badgeColor = 'green';
                    statusText = 'Verified'
                }
                return (
                    <div>
                        <div>
                            {props.getValue()}
                        </div>
                        <Badge
                            size="1"
                            className="text-[10px] mt-1"
                            color={badgeColor as any}
                        >
                            {statusText}
                        </Badge>
                    </div>
                );
            },
        }),
        columnHelper.accessor(row => row.idDoc, {
            id: 'id',
            header: 'ID Document',
            cell: props => {
                var status = props.row.original.idDocStatus;
                var badgeColor = 'gray';
                var statusText = "Pending";
                if (status === "uploaded") {
                    badgeColor = 'yellow';
                    statusText = 'Uploaded'
                }
                if (status === "verified") {
                    badgeColor = 'green';
                    statusText = 'Verified'
                }
                return (
                    <div className="text-center">
                        <div>
                            {status != null && <ViewImageDialog url={props.getValue()} title={"ID Document"} />}
                        </div>
                        <Badge
                            size="1"
                            className="text-[10px] mt-1"
                            color={badgeColor as any}
                        >
                            {statusText}
                        </Badge>
                    </div>
                );
            },
        }),
        columnHelper.accessor('createdAt', {
            header: 'Reg Date',
            id: 'reg_date',
            cell: info => { info.getValue()?.toLocaleDateString() },
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            id: 'status',
            cell: info => <Badge
                size="1"
                className="text-[10px] mt-1 capitalize"
                color={info.getValue() == "active" ? 'green' : (info.getValue() == "blocked" ? "red" : 'yellow')}
            >
                {info.getValue()}
            </Badge>,
        }),
        columnHelper.accessor('canTransfer', {
            header: 'Transfer',
            id: 'can_transfer',
            cell: info => <Badge
                size="1"
                className="text-[10px] mt-1"
                color={info.getValue() == 1 ? 'green' : 'red'}
            >
                {info.getValue() == 1 ? 'Enabled' : 'Disabled'}
            </Badge>,
        }),
    ];

    interface GlobalFilter {
        globalFilter: any
    }
    const [columnFilters, setGlobalFilters] = useState([])

    const table = useReactTable({
        columns: defaultColumns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setGlobalFilters,
    });

    return (<div>
        <div className="w-full md:w-[40%] mb-5">
            <form onSubmit={(e) => e.preventDefault()}>
                <CTextField
                    label=""
                    placeholder="Search User"
                    leftIcon={<Search size={15} className="mx-1" />}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    rightIcon={<IconButton variant="soft" color="gray" type="reset" onClick={() => {
                        table.resetGlobalFilter();
                    }}><MdCancel /></IconButton>}
                />
            </form>
        </div>

        <Table.Root size={'1'} layout={'auto'} variant="surface">
            <Table.Header>
                {table.getHeaderGroups().map(headerGroup => (
                    <Table.Row
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map(header => (
                            <Table.ColumnHeaderCell
                                onMouseDown={header.getResizeHandler()} //for desktop
                                onTouchStart={header.getResizeHandler()} //for mobile
                                width={`${header.getSize()}px`}
                                key={header.id}
                                style={{
                                    transform: header.column.getIsResizing()
                                        ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                                        : '',
                                }}>

                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Header>
            <Table.Body>
                {table.getRowModel().rows.map(row => (
                    <Table.Row key={row.id}
                        className="items-center border-card-background-light dark:border-card-background-dark bg-card-background-light hover:bg-[var(--accent-3)] dark:bg-card-background-dark backdrop-blur-sm !mb-3 py-2 border-b-2 transition-colors duration-300 cursor-pointer text-sm"
                    >
                        {row.getVisibleCells().map(cell => (
                            <Table.Cell justify={'start'} align="center" width={`${cell.column.getSize()}px`} key={cell.id} className="text-nowrap">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div>)
}

function ViewImageDialog({ title, url }) {
    // alert(url);
    return (<
        MyDialog title={title}
        maxWidth="500px"
        trigger={<Button size={'1'} variant="ghost">Preview</Button>}
        children={<div className="">
            <img className="w-[400px] h-[400px] object-contain" src={url} />
        </div>} description={""} />);
}


