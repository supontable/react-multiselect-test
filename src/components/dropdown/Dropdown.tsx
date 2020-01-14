import React, { useEffect } from 'react';
import Input from './DropdownInput';
import DropdownOption from './DropdownOption';
import './dropdown.css';

import { useDropdownState, useDropdownDispatch } from '../../hooks/useDropdown';
import DropdownList from './DropdownList';

const Dropdown: React.FC<{ initialList: Array<string> }> = (props) => {
    const { initialList } = props
    const { inputCurrentValue, filteredList, isOpen } = useDropdownState()
    const dispatch = useDropdownDispatch()
    useEffect(() => {
        dispatch({ type: 'init', payload: initialList })
    }, [dispatch, initialList])

    const dropdownListClass = isOpen
        ? 'list opened'
        : 'list'
    const handleKeyDown = (e: React.KeyboardEvent) => {
            switch (e.which) {
                case 27: // Escape
                    dispatch({type: 'toggleList', payload: false});
                    break;
                case 38: // Up Arrow
                    if (e.altKey) {
                        return;
                    }
                    dispatch({ type: 'updateFocus', payload: -1 })
                    break;
                case 40: // Down Arrow
                    if (e.altKey) {
                        return;
                    }
                    dispatch({ type: 'updateFocus', payload: 1 })
                    break;
                default:
                    return;
            }
    
            e.preventDefault();
        }
    return (
        <div className="dropdown" onKeyDown={handleKeyDown}>
            <Input
                value={inputCurrentValue}
            />
            <DropdownList className={dropdownListClass}>
                {[...filteredList].map((option, index) => (
                    <DropdownOption
                        value={option}
                        key={index}
                        tabindex={index}
                    />
                ))}
            </DropdownList>
        </div>
    )
};
Dropdown.displayName = 'Dropdown'
export default Dropdown;