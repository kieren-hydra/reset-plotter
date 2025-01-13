import {useNavigate, useSearchParams} from "react-router";
import useOnClickHandlers from "../../hooks/useOnClickHandlers.tsx";
import ModalTemplate from "./ModalTemplate.tsx";

const UnsavedNavModal = () => {

    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    const blockedPath = queryParams.get("blocked_path");

    const {handleSaveBoundary} = useOnClickHandlers();

    const handleDiscardChanges = () => {
        if (blockedPath) {
            //The blocked_path param is set by the dashboard item that was clicked on - KACM
            navigate(blockedPath)
        }
    }

    return (
        <ModalTemplate
            hasCheckbox={false}
            backBtnText={"Move and discard current changes"}
            actionBtnText={"Save changes"}
            actionBtnColor={"orange"}
            handleBackBtn={handleDiscardChanges}
            handleActionBtn={handleSaveBoundary}>

            <>
                <h2>Unsaved changes detected</h2>
                <p>Moving will discard any unsaved changes. Are you sure you want to continue?</p>
            </>

        </ModalTemplate>
    )
}

export default UnsavedNavModal