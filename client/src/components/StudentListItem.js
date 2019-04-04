import React from "react";

const StudentListItem = props => {
    return (
        <li>
            <h3>{props.name}</h3>
            {props.full ? (
                <>
                    <p>{props.location}</p>
                    <p>{props.keywords.join(" | ")}</p>
                    <p>{props.class}</p>
                    <p>New to tech? {props.isInTech ? "true" : "false"}</p>
                </>
            ) : null}
        </li>
    )
}

export default StudentListItem;