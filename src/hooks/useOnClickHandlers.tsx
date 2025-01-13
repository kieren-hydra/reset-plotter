import {useSearchParams} from "react-router";

const useOnClickHandlers = () => {
    const [queryParams, setQueryParams] = useSearchParams();

    const handleModalClose = () => {
        queryParams.delete("warning");
        if (queryParams.has('blocked_path')) {
            queryParams.delete('blocked_path')
        }
        setQueryParams(queryParams);
    }

    const handleSaveBoundary = () => {
        alert("boundary saved! (but not really)")
        if (queryParams.has("warning")) {
            queryParams.delete("warning")
        }
        setQueryParams(queryParams)
    }

    return {handleModalClose, handleSaveBoundary}
}

export default useOnClickHandlers;