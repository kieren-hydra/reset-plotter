import {useNavigate} from "react-router";
import {useEffect} from "react";

const NoRouteMatch = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/")
    });

    return null
}

export default NoRouteMatch;