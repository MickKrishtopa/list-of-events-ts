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
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

    useEffect(() => {
        setProducts(events);
    }, [events]);

    useEffect(() => {
        document.addEventListener('keydown', handleSpaceClick);
        return () => {
            document.removeEventListener('keydown', handleSpaceClick);
        };
    });
    const handleSpaceClick = (e: KeyboardEvent) => {
        if (e.keyCode === 32) {
            if (selectedEvent) {
                toggleStatus(selectedEvent.id);
                setSelectedEvent(null);
            }
        }
    };

    const gridItem = (event: IEvent) => {
        return (
            <div
                onClick={() => {
                    if (selectedEvent && event.id === selectedEvent.id) {
                        setSelectedEvent(null);
                        return;
                    }
                    setSelectedEvent(event);
                }}
                className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2"
            >
                <div
                    className={
                        selectedEvent && event.id === selectedEvent.id
                            ? 'p-4 border-4  surface-card border-round border-dotted border-blue-500'
                            : event.new
                            ? 'p-4 border-1 surface-border surface-card border-round'
                            : 'p-4 border-2  surface-card border-round border-green-500'
                    }
                >
                    <div className="flex flex-column align-items-start gap-3">
                        <div className="flex gap-2 align-items-center">
                            <p className="m-0 text-l font-bold">Дата:</p>
                            <p className="m-0 text-m ">{event.date}</p>
                        </div>
                        <div className="flex gap-2 align-items-center">
                            <p className="m-0 text-l font-bold">Важность:</p>
                            <p className="m-0 text-m ">{event.priority}</p>
                        </div>
                        <div className="flex gap-2 align-items-center">
                            <p className="m-0 text-l font-bold">
                                Оборудование:
                            </p>
                            <p className="m-0 text-m ">{event.equipment}</p>
                        </div>
                        <div className="flex gap-2 align-items-center">
                            <p className="m-0 text-l font-bold">Сообщение:</p>
                            <p className="m-0 text-m ">{event.message}</p>
                        </div>
                        <div className="flex gap-2 align-items-center">
                            <p className="m-0 text-l font-bold">
                                Ответственный:
                            </p>
                            <p className="m-0 text-m ">{event.responsible}</p>
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
                paginator
                rows={9}
            />
        </div>
    );
}
