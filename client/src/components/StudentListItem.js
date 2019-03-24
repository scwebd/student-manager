import React from "react";

const StudentListItem = props => {
    return (
        <li>
            <h3>{props.name}</h3>
            <p>{props.location}</p>
            <p>{props.keywords.join(" | ")}</p>
            <p>{props.class}</p>
            <p>New to tech? {props.isInTech ? "true" : "false"}</p>
        </li>
    )
}

export default StudentListItem;