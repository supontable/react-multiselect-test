import React, { useReducer, Dispatch } from 'react';
import { match } from '../common/utils';

export interface IDropdownStateCtx {
    isOpen: boolean;
    inputCurrentValue: string;
    optionsList: Array<string>;
    selectedSet: Set<string>;
    filteredList: Array<string>;
    focusedElement: string;
    error?: string;
}

type Reducer<S, A> = (prevState: S, action: A) => S
type Action =
    | { type: 'init', payload: Array<string> }
    | { type: 'select', payload: string }
    | { type: 'change', payload: string }
    | { type: 'focus', payload: string }
    | { type: 'updateFocus', payload: number }
    | { type: 'toggleList', payload: boolean }
    | { type: 'selectAll' }
    | { type: 'selectNone' }
    | { type: 'never' }

const DropdownInitialState: IDropdownStateCtx = {
    inputCurrentValue: '',
    optionsList: [],
    selectedSet: new Set(),
    filteredList: [],
    focusedElement: '',
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
            return {
                ...state,
                focusedElement: action.payload,
            }
        case 'updateFocus':
            console.log(state.filteredList.length)
            const currentFocusIndex = state.filteredList.indexOf(state.focusedElement)
            const listLength = state.filteredList.length
            let newFocusIndex = currentFocusIndex
            if (currentFocusIndex === -1 || currentFocusIndex === listLength) {
                newFocusIndex = !!~action.payload
                    ? newFocusIndex + action.payload
                    : listLength + action.payload
            } else {
                newFocusIndex = newFocusIndex + action.payload
            }

            return {
                ...state,
                focusedElement: state.filteredList[newFocusIndex]
            }
        case 'toggleList':
            return {
                ...state,
                isOpen: action.payload
            }
        case 'select':
            tempSet = new Set(state.selectedSet)
            tempArray = [...state.filteredList]
            if (tempSet.has(action.payload)) {
                tempSet.delete(action.payload)
                let unselectedIndex = state.optionsList.indexOf(action.payload)
                let removedOption = state.optionsList[unselectedIndex]
                tempArray[unselectedIndex] = removedOption
            } else {
                tempSet.add(action.payload)
                let selectedIndex = tempArray.indexOf(action.payload)
                tempArray.splice(selectedIndex, 1)
            }
            return { ...state, selectedSet: tempSet, filteredList: tempArray };
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