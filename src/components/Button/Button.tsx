import { Button } from 'primereact/button';

type Props = {
    label: string;
    disabled: boolean;
    onClick: () => void;
};

export default function CommonButton({ label, disabled, onClick }: Props) {
    return (
        <div className="card flex justify-content-center">
            <Button label={label} disabled={disabled} onClick={onClick} />
        </div>
    );
}
