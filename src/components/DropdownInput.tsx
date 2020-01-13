import React from 'react';
import './dropdownInput.css';
import { useDropdownState } from '../hooks/useDropdown';

export interface IInput {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCloseTag: (value: string) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
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
    const { selectedSet } = useDropdownState()
    return (
        <div className="inputWrapper">
            {selectedSet.size > 0 && [...selectedSet].map((option, index) =>
                <Tag
                    value={option}
                    key={index}
                    onClose={props.onCloseTag}
                />)}
            <input
                type="text"
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                className="input"
            />
        </div>
    )
};

export default Input;