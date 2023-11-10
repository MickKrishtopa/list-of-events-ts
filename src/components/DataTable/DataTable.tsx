import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {
    TriStateCheckbox,
    TriStateCheckboxChangeEvent,
} from 'primereact/tristatecheckbox';

import ToggleButton from '../ToggleButton/ToggleButton';
import { IEvent } from '../../types/types';

type Props = {
    events: Array<IEvent>;
    toggleStatus: (id: string) => void;
};

export default function SingleColumnDemo({ events, toggleStatus }: Props) {
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        priority: { value: null, matchMode: FilterMatchMode.CONTAINS },
        equipment: { value: null, matchMode: FilterMatchMode.CONTAINS },
        message: { value: null, matchMode: FilterMatchMode.CONTAINS },
        responsible: { value: null, matchMode: FilterMatchMode.CONTAINS },
        new: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    useEffect(() => {
        setLoading(false);
    }, []);

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

    const readedBodyTemplate = (rowData: IEvent) => {
        return (
            <ToggleButton
                isNew={rowData.new}
                onClick={() => toggleStatus(rowData.id)}
            />
        );
    };

    const readedRowFilterTemplate = (
        options: ColumnFilterElementTemplateOptions,
    ) => {
        return (
            <TriStateCheckbox
                value={options.value}
                onChange={(e: TriStateCheckboxChangeEvent) =>
                    options.filterApplyCallback(e.value)
                }
            />
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={events}
                showGridlines
                stripedRows
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
                    field="new"
                    header="Новое"
                    dataType="boolean"
                    body={readedBodyTemplate}
                    sortable
                    style={{ width: '5%' }}
                    filter
                    filterElement={readedRowFilterTemplate}
                />

                <Column
                    field="date"
                    header="Дата"
                    sortable
                    style={{ width: '12%' }}
                    filter
                    filterPlaceholder="Дата"
                />

                <Column
                    field="priority"
                    header="Важность"
                    sortable
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Важность"
                />

                <Column
                    field="equipment"
                    header="Оборудование"
                    sortable
                    style={{ width: '16%' }}
                    filter
                    filterPlaceholder="Оборудование"
                />

                <Column
                    field="message"
                    header="Сообщение"
                    sortable
                    // style={{ width: '30%' }}
                    filter
                    filterPlaceholder="Сообщения"
                />

                <Column
                    field="responsible"
                    header="Исполнитель"
                    sortable
                    style={{ width: '15%' }}
                    filter
                    filterPlaceholder="Исполнитель"
                />
            </DataTable>
        </div>
    );
}
