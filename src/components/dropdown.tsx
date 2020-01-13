import React, { useEffect } from 'react';
import Input from './DropdownInput';
import DropdownOption from './DropdownOption';
import './dropdown.css';

import { useDropdownState, useDropdownDispatch } from '../hooks/useDropdown';
import DropdownList from './DropdownList';

const Dropdown: React.FC<{ initialList: Array<string> }> = (props) => {
    const { initialList } = props
    const { inputCurrentValue, filteredList, isOpen } = useDropdownState()
    const dispatch = useDropdownDispatch()
    useEffect(() => {
        dispatch({ type: 'init', payload: initialList })
    }, [dispatch, initialList])
    const handleInputChanging = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'change', payload: e.target.value })
    }
    const handleInputFocus = (e: React.FocusEvent<HTMLElement>) => {
        dispatch({type: 'toggleList', payload: true})
        console.log('input focus');
    }
    const handleTagClosing = (value: string) => {
        dispatch({ type: 'select', payload: value })
    }
    const dropdownListClass = isOpen
        ? 'list opened'
        : 'list'

    return (
        <div className="dropdown">
            <Input
                value={inputCurrentValue}
                onChange={handleInputChanging}
                onCloseTag={handleTagClosing}
                onFocus={handleInputFocus}
            />
            <DropdownList className={dropdownListClass}>
                {[...filteredList].map((option, index) => (
                    <DropdownOption
                        value={option}
                        key={index}
                    />
                ))}
            </DropdownList>
        </div>
    )
};
Dropdown.displayName = 'Dropdown'
export default Dropdown;