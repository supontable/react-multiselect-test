import React from 'react';
import { useDropdownDispatch } from '../../hooks/useDropdown';
import './dropdownList.css'

const DropdownList: React.FC<{ className: string }> = (props) => {
    const { children, className } = props
    const dispatch = useDropdownDispatch()
    const handleMouseLeave = () => {
        dispatch({ type: 'focus', payload: '' })
    }

    return (
        <div
            className={className}
            onMouseLeave={handleMouseLeave}
            role='listbox'
        >
            {children}
        </div>
    )
}
export default DropdownList