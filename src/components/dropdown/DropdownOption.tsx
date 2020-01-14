import React, { useEffect } from 'react'
import { useDropdownState, useDropdownDispatch } from '../../hooks/useDropdown'
import './dropdownOption.css'

type TDropdownOption = {
    value: string;
    tabindex: number;
}

const DropdownOption: React.FC<TDropdownOption> = ({value, tabindex}) => {
    const {selectedSet, focusedElement} = useDropdownState()
    const dispatch = useDropdownDispatch()

    const optionRef = React.useRef<HTMLButtonElement>(null);
    const node = optionRef.current
    useEffect(() => {
        if (focusedElement === value) {
            node && node.focus()
        }
    })
    let optionClass = selectedSet.has(value) ? 'option selected' : 'option'
    if (focusedElement === value) {
        optionClass = optionClass + ' focused'
    }
    const handleClick = (e: React.MouseEvent): void => {
        dispatch({type: 'select', payload: value})
    }

    const handleFocus = (e: React.MouseEvent) => {
        dispatch({type: 'focus', payload: value})
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.which) {
            case 13: // Enter
            case 32: // Space
                dispatch({type: 'select', payload: value})
                break;
            default:
                return;
        }
        e.preventDefault();
    }

    return (
        <button
            ref={optionRef}
            tabIndex={tabindex}
            className={optionClass}
            onClick={handleClick}
            onMouseEnter={handleFocus}
            onKeyDown={handleKeyDown}
        >
            {value}
        </button>
    )
};

export default DropdownOption;