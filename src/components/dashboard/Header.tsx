import plottrLogo from "../../assets/icons/plottr-logo.svg";
const Header = () => {
    return (
        <div className={"flex gap-2 mb-8"}>
            <img src={plottrLogo} alt="Ghost Icon"/>
            <h1>Plottr</h1>
        </div>
    )
}

export default Header
