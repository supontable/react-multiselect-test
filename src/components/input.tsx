import React from 'react';

export interface IInput {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props:IInput) => {
    return (
        <input type="text" value={props.value} onChange={props.onChange} />
    )
};

export default Input;