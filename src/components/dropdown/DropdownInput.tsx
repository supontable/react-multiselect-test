import React, { useEffect } from 'react';
import './dropdownInput.css';
import { useDropdownState, useDropdownDispatch } from '../../hooks/useDropdown';

export interface IInput {
    value?: string;
}
type TTag = React.FC<{
    value: string,
    onClose: (value: string) => void,
}>

const Tag: TTag = (props) =>
    <span className="tag">{props.value}
        <i onClick={e => props.onClose(props.value)}>x</i>
    </span>

const Input = (props: IInput) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const node = inputRef.current
    const { selectedSet } = useDropdownState()
    const dispatch = useDropdownDispatch()
    useEffect(() => {
        if (node) {
            selectedSet.size && node.focus()
        }
    }, [selectedSet, node])
    const handleInputChanging = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'change', payload: e.target.value })
    }

    const handleInputFocus = () => {
        dispatch({type: 'toggleList', payload: true})
    }

    const handleInputBlur = (e: React.FocusEvent) => {
        if (e.relatedTarget) return false
        dispatch({type: 'toggleList', payload: false})
    }

    const handleTagClosing = (value: string) => {
        dispatch({ type: 'select', payload: value })
    }

    return (
        <div className="inputWrapper">
            {selectedSet.size > 0 && [...selectedSet].map((option, index) =>
                <Tag
                    value={option}
                    key={index}
                    onClose={handleTagClosing}
                />)}
            <input
                ref={inputRef}
                type="text"
                value={props.value}
                onChange={handleInputChanging}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="input"
            />
        </div>
    )
};

export default Input;