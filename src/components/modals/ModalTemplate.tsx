import {useState} from "react";
import PlottrButton from "../global/PlottrButton.tsx";
import {ModalProps} from "../../types/props.ts";

const ModalTemplate = ({
                           children,
                           hasCheckbox,
                           checkboxText,
                           backBtnText,
                           actionBtnText,
                           actionBtnColor,
                           handleBackBtn,
                           handleActionBtn
                       }: ModalProps) => {

    // if no checkbox, set to true so button is not disabled - KACM
    const [checked, setChecked] = useState<boolean>(!hasCheckbox);

    const handleCheckboxChange = () => {
        setChecked(!checked)
    }

    return (
        <>
            {children}
            <div>
                {hasCheckbox && (
                    <>
                        <div className="flex items-center text-red gap-2">
                            <i className="ri-error-warning-fill text-red text-xl"></i>
                            <small>This action cannot be undone</small>
                        </div>
                        <div className="flex items-center gap-2 pl-1 mb-4">
                            <input
                                data-cy="modal-checkbox"
                                type="checkbox"
                                id="warning-confirm-checkbox"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <label className="small" htmlFor="warning-confirm-checkbox">
                                <small>{checkboxText}</small>
                            </label>
                        </div>
                    </>
                )}
                <div className="flex gap-4">
                    <PlottrButton
                        dataCy={"back-modal-btn"}
                        handleClick={handleBackBtn}
                        label={backBtnText}
                        color={"white"}
                    />
                    <PlottrButton
                        dataCy={"reload-modal-btn"}
                        handleClick={handleActionBtn}
                        label={actionBtnText}
                        color={actionBtnColor}
                        disabled={!checked}
                    />
                </div>
            </div>
        </>
    )
}

export default ModalTemplate