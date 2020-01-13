import React from 'react';
import { useDropdownState, useDropdownDispatch } from '../hooks/useDropdown';

type TDropdownOption = {
    value: string;
}

const DropdownOption: React.FC<TDropdownOption> = ({value}) => {
    const {selectedSet} = useDropdownState()
    const dispatch = useDropdownDispatch()
    const optionClass = selectedSet.has(value) ? 'option selected' : 'option';
    const handleClick = (e: React.MouseEvent): void => {
        dispatch({type: 'select', payload: value})
    }
    const handleFocus = (e: React.MouseEvent<HTMLElement>) => {
        dispatch({type: 'focus', payload: value})
    }
    return (
        <span
            className={optionClass}
            onClick={handleClick}
            onMouseEnter={handleFocus}
        >
            {value}
        </span>
    )
};

export default DropdownOption;