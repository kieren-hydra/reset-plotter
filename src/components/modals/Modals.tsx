import {useSearchParams} from "react-router";
import {ReactNode, useEffect, useState} from "react";
import ReloadLiveBoundaryModal from "./ReloadLiveBoundaryModal.tsx";
import UnsavedNavModal from "./UnsavedNavModal.tsx";
import useOnClickHandlers from "../../hooks/useOnClickHandlers.tsx";

type WarningType = "reload_live_boundary" | "unsaved_nav" | null

const Modals = () => {

    const {handleModalClose} = useOnClickHandlers();
    const [queryParams] = useSearchParams();
    const [activeModalContent, setActiveModalContent] = useState<ReactNode | null>(null)

    const chooseModalContent = (warningType: WarningType) => {
        switch (warningType) {
            case "reload_live_boundary":
                return (
                    <ReloadLiveBoundaryModal/>
                );
            case "unsaved_nav":
                return (
                    <UnsavedNavModal/>
                );
            default:
                console.warn("There was no warning type found");
                break;
        }
    };

    useEffect(() => {
        const warningTypeParam = queryParams.get("warning") as WarningType;
        if (warningTypeParam) {
            const modalContent = chooseModalContent(warningTypeParam);
            setActiveModalContent(modalContent)
        } else {
            setActiveModalContent(null)
        }
    }, [queryParams]);


    return (
        <>{activeModalContent &&
            <div
                data-cy="warning-modal"
                className='flex w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 items-center justify-center'>
                <div className="flex flex-col justify-between w-[45rem] h-[27rem] bg-white rounded-lg px-12 py-8 ">
                    <div className="flex justify-between mb-8">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="40" viewBox="0 0 46 61"
                                 fill="none">
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

                    {activeModalContent}
                </div>
            </div>
        }</>)
}


export default Modals;
