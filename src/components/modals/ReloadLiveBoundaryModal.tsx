import ModalTemplate from "./ModalTemplate.tsx";
import useOnClickHandlers from "../../hooks/useOnClickHandlers.tsx";
import {useSearchParams} from "react-router";

const ReloadLiveBoundaryModal = () => {
    const [queryParams, setQueryParams] = useSearchParams()

    const {handleModalClose} = useOnClickHandlers();

    const handleActionBtn = () => {
        queryParams.set("action", "load_boundary")
        queryParams.delete("warning");
        if (queryParams.has('blocked_path')) {
            queryParams.delete('blocked_path')
        }
        setQueryParams(queryParams);
    }

    return (
        <ModalTemplate
            hasCheckbox={true}
            backBtnText={"Back to Geofence Editor"}
            actionBtnText={"Reload Saved Boundary"}
            actionBtnColor={"white"}
            checkboxText={"I understand that unsaved changes will be lost."}
            handleBackBtn={handleModalClose}
            handleActionBtn={handleActionBtn}>

            <>
                <h2>Reload Last Saved Boundary?</h2>
                <p>"Reloading will discard any unsaved changes. Are you sure you want to continue?"</p>
            </>

        </ModalTemplate>
    )
}

export default ReloadLiveBoundaryModal