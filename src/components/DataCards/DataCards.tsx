import { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';

import { IEvent } from '../../types/types';

type Props = {
    events: Array<IEvent>;
    toggleStatus: (id: string) => void;
};

export default function DataCards({ events, toggleStatus }: Props) {
    const [products, setProducts] = useState<Array<IEvent>>([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        setProducts(events.slice(0, 12));
    }, []);

    const gridItem = (event: IEvent) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{event.date}</div>
                        <div className="text-2xl font-bold">
                            {event.priority}
                        </div>
                        <div className="text-2xl font-bold">
                            {event.equipment}
                        </div>
                        <div className="text-2xl font-bold">
                            {event.message}
                        </div>
                        <div className="text-2xl font-bold">
                            {event.responsible}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (event: IEvent) => {
        if (!event) {
            return;
        }

        return gridItem(event);
    };

    return (
        <div className="card">
            <DataView
                value={products}
                itemTemplate={itemTemplate}
                layout="grid"
            />
        </div>
    );
}
