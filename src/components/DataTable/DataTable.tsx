import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import {
    TriStateCheckbox,
    TriStateCheckboxChangeEvent,
} from 'primereact/tristatecheckbox';

import { data } from '../../utils/data';

interface IEvent {
    id: number;
    date: string;
    priority: string;
    equipment: string;
    message: string;
    responsible: string;
}

export default function SingleColumnDemo() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        priority: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        equipment: { value: null, matchMode: FilterMatchMode.EQUALS },
        message: { value: null, matchMode: FilterMatchMode.IN },
        responsible: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [priority, setPriority] = useState<string[]>([]);
    const [equipment, setEquipment] = useState<string[]>([]);
    const [message, setMessage] = useState<string[]>([]);
    const [responsible, setResponsible] = useState<string[]>([]);

    useEffect(() => {
        setEvents(data);
        setLoading(false);
    }, []);

    const getEvents = (data: IEvent[]) => {
        return [...(data || [])].map((d) => {
            // @ts-ignore
            d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Общий поиск"
                    />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={events}
                showGridlines
                stripedRows
                resizableColumns
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ width: '100%' }}
                removableSort
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={[
                    'priotity',
                    'equipment',
                    'message',
                    'responsible',
                ]}
                header={header}
                emptyMessage="События не найдены"
            >
                <Column
                    field="date"
                    header="Дата"
                    sortable
                    style={{ width: '12%' }}
                    filter
                    filterPlaceholder="Дата"
                ></Column>
                <Column
                    field="priority"
                    header="Важность"
                    sortable
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Важность"
                ></Column>
                <Column
                    field="equipment"
                    header="Оборудование"
                    sortable
                    style={{ width: '16%' }}
                    filter
                    filterPlaceholder="Оборудование"
                ></Column>
                <Column
                    field="message"
                    header="Сообщение"
                    sortable
                    // style={{ width: '30%' }}
                    filter
                    filterPlaceholder="Сообщения"
                ></Column>
                <Column
                    field="responsible"
                    header="Исполнитель"
                    sortable
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Исполнитель"
                ></Column>
            </DataTable>
        </div>
    );
}
