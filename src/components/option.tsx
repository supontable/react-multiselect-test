import React, { useState } from 'react';

export interface IOption {
    readonly value: string;
    readonly isSelected: boolean;
}

type IOptionProps = IOption & {
    readonly handleChangeSelected: (option: string, checked: boolean) => void;
}

const Option = (props: IOptionProps) => {
    const {isSelected, handleChangeSelected, value} = props;
    const optionClass = isSelected ? 'option selected' : 'option';
    const [checked, toggleChecked] = useState<boolean>(false);
    const handleClick = (e: React.MouseEvent): void => {
        const currentStatus = !checked;
        toggleChecked(currentStatus);
        handleChangeSelected(value, currentStatus)
    }
    return (
        <span
            className={optionClass}
            onClick={handleClick}
        >
            {value}
        </span>
    )
};

export default Option;