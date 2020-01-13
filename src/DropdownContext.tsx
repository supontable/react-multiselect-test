import React, { useReducer, Dispatch } from 'react';
import { match } from './common/utils';

export interface IDropdownStateCtx {
    isOpen: boolean;
    inputCurrentValue: string;
    optionsList: Array<string>;
    selectedSet: Set<string>;
    filteredList: Array<string>;
    focusedElement: string | null;
    error?: string;
}

type Reducer<S, A> = (prevState: S, action: A) => S
type Action =
    | { type: 'init', payload: Array<string> }
    | { type: 'select', payload: string }
    | { type: 'change', payload: string }
    | { type: 'focus', payload: string }
    | { type: 'toggleList', payload: boolean }
    | { type: 'selectAll' }
    | { type: 'selectNone' }
    | { type: 'never' }

const DropdownInitialState: IDropdownStateCtx = {
    inputCurrentValue: '',
    optionsList: [],
    selectedSet: new Set(),
    filteredList: [],
    focusedElement: null,
    isOpen: false,
}

const DropdownStateCtx = React.createContext<IDropdownStateCtx>(DropdownInitialState)
const DropdownDispatchCtx = React.createContext<Dispatch<Action> | undefined>(undefined)

const dropdownReducer: Reducer<IDropdownStateCtx, Action> = (state, action) => {
    let tempSet;
    let tempArray;
    switch (action.type) {
        case 'init':
            return {
                ...state,
                optionsList: [...action.payload],
                filteredList: [...action.payload]
            };
        case 'change':
            tempArray = match(action.payload, [...state.optionsList])
            return {
                ...state,
                inputCurrentValue: action.payload,
                filteredList: [...tempArray]
            };
        case 'focus':
            console.log(action.payload)
            return {
                ...state,
                focusedElement: action.payload,
            }
        case 'toggleList':
            console.log(action.payload)
            return {
                ...state,
                isOpen: !state.isOpen
            } 
        case 'select':
            tempSet = new Set(state.selectedSet)
            tempSet.has(action.payload)
                ? tempSet.delete(action.payload)
                : tempSet.add(action.payload)
            return { ...state, selectedSet: tempSet };
        case 'selectAll':
            tempSet = new Set(state.optionsList)
            return { ...state, selectedSet: tempSet };
        case 'selectNone':
            tempSet = new Set(state.selectedSet)
            tempSet.clear()
            return { ...state, selectedSet: tempSet };;
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
const DropdownProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(dropdownReducer, DropdownInitialState)
    return (
        <DropdownStateCtx.Provider value={state}>
            <DropdownDispatchCtx.Provider value={dispatch}>
                {children}
            </DropdownDispatchCtx.Provider>
        </DropdownStateCtx.Provider>
    )
}

export { DropdownProvider, DropdownStateCtx, DropdownDispatchCtx }