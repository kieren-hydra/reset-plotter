import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import ErrorFallback from "./ErrorFallback.tsx";
import PlottrButton from "./PlottrButton.tsx";

type WarningType = "reload_live_boundary" | null
const Modal = () => {

    const [queryParams, setQueryParams] = useSearchParams();
    const [warningType, setWarningType] = useState<WarningType>(null)
    const [checked, setChecked] = useState<boolean>(false)
    const warningParam = queryParams.get("warning");

    useEffect(() => {
        setWarningType(warningParam as WarningType)
    }, [warningParam])

    const modalContentMap = {
        reload_live_boundary: {
            titleQuestion: "Reload Last Saved Boundary?",
            subQuestion: "Reloading will discard any changes made since that date. Are you sure you want to continue?",
            checkboxText: "I understand that unsaved changes will be lost.",
            backBtnText: "Back to Geofence Editor",
            actionBtnText: "Reload Saved Boundary",
        }
    }

    const handleModalClose = () => {
        queryParams.delete("warning");
        setQueryParams(queryParams);
    }

    const handleCheckboxChange = () => {
        setChecked(!checked)
    }

    const handleActionBtnClick = (warningType: WarningType) => {
        switch (warningType as WarningType) {
            case "reload_live_boundary":
                queryParams.set("action" , "reload_boundary")
                // This will trigger the SiteBoundaryEditable component to repopulate the store with the data from the reset API - KACM
                break;

            default:
                console.warn("No warning type found");
                break;
        }
        setChecked(false);
        handleModalClose();
        queryParams.set("saved", "true")
        setQueryParams(queryParams)
    }

    return (
        <div
            data-cy="warning-modal"
            className={`${warningType !== null ? "flex" : "hidden"} w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 items-center justify-center`}>
            <div className="flex flex-col justify-between w-[45rem] h-[27rem] bg-white rounded-lg px-12 py-8 ">
                <div className="flex justify-between mb-8">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="40" viewBox="0 0 46 61" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M23.3853 60.5L38.7038 40.7461C45.1529 30.6282 49.5679 17.1658 39.7064 7.5016C29.8446 -2.16258 15.3909 -1.6597 5.52929 8.00448C-4.33231 17.6687 0.757287 30.6282 7.18172 40.7461L23.3853 60.5ZM22.531 30.3718C26.9064 30.3718 30.4533 26.9204 30.4533 22.663C30.4533 18.4055 26.9064 14.9541 22.531 14.9541C18.1557 14.9541 14.6088 18.4055 14.6088 22.663C14.6088 26.9204 18.1557 30.3718 22.531 30.3718Z"
                                  fill="#F7941E"/>
                        </svg>
                        <h2>Plottr</h2>
                    </div>
                    <button
                        data-cy="close-modal-btn"
                        onClick={handleModalClose}
                    >
                        <i className="ri-close-large-line"></i>
                    </button>
                </div>

                {warningType && modalContentMap[warningType] ?
                    <>
                        <div className="mb-8">
                            <h3 className="h2 font-bold mb-2">{modalContentMap[warningType].titleQuestion}</h3>
                            <p>{modalContentMap[warningType].subQuestion}</p>
                        </div>
                        <div>
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
                                    <small>{modalContentMap[warningType].checkboxText}</small>
                                </label>
                            </div>
                            <div className="flex gap-4">
                                <PlottrButton
                                    dataCy={"back-modal-btn"}
                                    handleClick={handleModalClose}
                                    label={modalContentMap[warningType].backBtnText}
                                    color={"white"}
                                />
                                <PlottrButton
                                    dataCy={"reload-modal-btn"}
                                    handleClick={() => handleActionBtnClick(warningType)}
                                    label={modalContentMap[warningType].actionBtnText}
                                    color={"white"}
                                    disabled={!checked}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <ErrorFallback/>
                }
            </div>
        </div>
    )
}


export default Modal;
