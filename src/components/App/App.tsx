import './App.scss';

import { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import { IEvent } from '../../types/types';

import { createEvent } from '../../utils/createEvent';
import { data } from '../../utils/data';

function App() {
    const [events, setEvents] = useState<IEvent[]>(data);

    const toggleStatus = (id: string): void => {
        console.log('click');
        setEvents((prev) => {
            const toggledEvent = prev.find((e) => e.id === id);
            console.log(toggledEvent);
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
    //     setTimeout(() => {
    //         setEvents([newEvent, ...events]);
    //     }, 10000);
    // });

    return (
        <section className="App">
            <h1>Hello</h1>
            <DataTable events={events} toggleStatus={toggleStatus} />
            {/* <Demo /> */}
        </section>
    );
}

export default App;
