import { useContext } from "react"
import { DropdownStateCtx, DropdownDispatchCtx } from "../components/DropdownContext"

const useDropdownState = () => {
    const context = useContext(DropdownStateCtx)
    if (context === undefined) {
        throw new Error('Dropdown context must be used with provider')
    }
    return context
}
const useDropdownDispatch = () => {
    const context = useContext(DropdownDispatchCtx)
    if (context === undefined) {
        throw new Error('Dropdown context must be used with provider')
    }
    return context
}

export {useDropdownState, useDropdownDispatch}