import {ReactNode} from "react";

type PlottrButtonProps = {
    handleClick: () => void
    label: string
    disabled?: boolean
    icon?: ReactNode
    color: "white" | "orange"
    dataCy?: string
}
const PlottrButton = ({dataCy, handleClick, label, disabled = false, icon, color}: PlottrButtonProps) => {

    const colors = {
        "white": {
            bg: "bg-white",
            text: disabled ? "text-gray-400" : "text-gray",
            hover: disabled ? "" : "hover:bg-gray-50"
        },
        "orange": {
            bg: "bg-orange",
            text: disabled ? "text-gray-400" : "text-white",
            hover: disabled ? "" : "hover:bg-amber-400"
        }
    }

    return (
        <button
            data-cy={dataCy}
            className={`w-fit h-10 flex gap-2 items-center border border-gray-300 rounded-md px-4 text-gray ${colors[color].bg} ${colors[color].text} ${colors[color].hover} whitespace-nowrap`}
            onClick={handleClick}
            disabled={disabled}
        >{icon}{label}</button>
    )
}

export default PlottrButton