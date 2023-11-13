import './App.scss';

import { useState, useEffect } from 'react';

import DataTable from '../DataTable/DataTable';
import DataCards from '../DataCards/DataCards';
import Button from '../Button/Button';
import { IEvent } from '../../types/types';

import { createEvent } from '../../utils/createEvent';
import { data } from '../../utils/data';

function App() {
    const [events, setEvents] = useState<IEvent[]>(data);
    const [view, setView] = useState<string>('table');

    const toggleStatus = (id: string): void => {
        setEvents((prev) => {
            const toggledEvent = prev.find((e) => e.id === id);

            if (toggledEvent) {
                toggledEvent.new = !toggledEvent.new;
                return [...prev];
            } else {
                return prev;
            }
        });
    };

    // useEffect(() => {
    //     const newEvent = createEvent();
    //     const timerID = setInterval(() => {
    //         setEvents([newEvent, ...events]);
    //     }, 3000);
    //     return () => {
    //         clearInterval(timerID);
    //     };
    // });

    return (
        <section className="App">
            <div className="flex flex-row flex-wrap gap-3 m-5">
                <Button
                    label="Таблица"
                    disabled={view === 'table'}
                    onClick={() => setView('table')}
                />
                <Button
                    label="Карточки"
                    disabled={view === 'cards'}
                    onClick={() => setView('cards')}
                />
            </div>

            {view === 'table' && (
                <DataTable events={events} toggleStatus={toggleStatus} />
            )}
            {view === 'cards' && (
                <DataCards events={events} toggleStatus={toggleStatus} />
            )}
        </section>
    );
}

export default App;
