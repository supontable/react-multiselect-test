import React, { useState } from 'react';
import Input from './input';
import Option, { IOption } from './option';

interface IDropdownProps {
    optionsList: Array<IOption>;
    selected: Array<string>;
    onSelectedChanged: (selected: string[]) => void;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
    const [value, setValue] = useState<string>('');
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onClickOption = (option: string, checked: boolean) => {
        const { selected, onSelectedChanged } = props;
        const index = selected.indexOf(option);
        console.log(option, index, checked, selected)
        if (checked) {
            onSelectedChanged([...selected, option]);
        } else {
            const removed = [
            ...selected.slice(0, index),
            ...selected.slice(index + 1),
        ];
        onSelectedChanged(removed);
    }
    };
    return (
        <React.Fragment>
            <Input value={value} onChange={onInputChange} />
            {props.optionsList.map((optionData, index) => {
                const showElement = optionData.value.match(new RegExp(value, 'i'));
                return (
                    <React.Fragment key={index}>
                        {!!showElement &&
                            <Option
                                value={optionData.value}
                                isSelected={optionData.isSelected}
                                handleChangeSelected={onClickOption}
                            />}
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
};

export default Dropdown;