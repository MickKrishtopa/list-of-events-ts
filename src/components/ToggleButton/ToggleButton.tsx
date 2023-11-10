import { useState } from 'react';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

type Props = {
    isNew: boolean;
    onClick: () => void;
};

export default function Button({ isNew, onClick }: Props) {
    const [checked, setChecked] = useState<boolean>(isNew);

    return (
        <div className="card flex justify-content-center">
            <ToggleButton
                onClick={onClick}
                checked={checked}
                onChange={(e: ToggleButtonChangeEvent) => setChecked(e.value)}
                className="w-8rem"
            />
        </div>
    );
}
