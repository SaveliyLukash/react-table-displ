import {BsArrowDown, BsArrowUp, BsArrowUpDown} from "react-icons/bs";
import React, {useContext} from "react";
import {SortParamsContext} from "../contexts/SortContext";

function SortingHeader(props) {

    const {currentSortKey, currentSortOrder} = useContext(SortParamsContext);

    const active = (currentSortKey === props.dbValue);

    const thStyle = {
        verticalAlign: "middle",
        cursor: "pointer"
    }
    const thIn = {
        display: "flex",
        flexWrap: "no-wrap",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "#007bff" : "inherit"
    }
    const iconStyle = {
        marginLeft: "10px",
        marginTop: "4px",
    }

    const getIcon = () => {
        if(active && currentSortOrder === "desc"){
            return <BsArrowDown style={iconStyle}/>;
        }else if(active && currentSortOrder === "asc"){
            return <BsArrowUp style={iconStyle}/>;
        }else{
            return <BsArrowUpDown style={iconStyle}/>;
        }
    }

    return (
        <th style={thStyle} onClick={(e) => props.onClick(e, props.dbValue)}>
            <div style={thIn}>
                {props.children}
                <div>
                    {getIcon()}
                </div>
            </div>
        </th>
    )
}

export default SortingHeader;