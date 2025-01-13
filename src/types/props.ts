import {ReactNode} from "react";

export type ModalProps = {
    children: ReactNode,
    hasCheckbox: boolean,
    checkboxText?: string,
    backBtnText: string,
    actionBtnText: string,
    actionBtnColor: "white" | "orange",
    handleBackBtn: () => void,
    handleActionBtn: () => void
}