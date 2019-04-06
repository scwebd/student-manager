import React from "react";
import styled from "styled-components";

const Item = styled("li")`
    list-style-type: none;
    padding-bottom: 1em;
`

const Delete = styled("span")`
    color: #98012e;
    cursor: pointer;
    display: inline-block;
    font-size: 0.75em;
    padding-left: 1rem;
`

const StudentListItem = props => {
    return (
        <Item>
            <h3>
                {props.name} 
                {props.canDelete ? (
                    <Delete 
                        onClick={(event) => {
                            event.preventDefault();
                            props.setIdToDelete(props.id);
                            props.toggleDeleteModal();
                        }}
                    >
                        (delete)
                    </Delete> 
                ) : null}
            </h3>
            {props.full ? (
                <>
                    <p>{props.location}</p>
                    <p>{props.keywords.join(" | ")}</p>
                    <p>{props.class}</p>
                    <p>New to tech? {props.isInTech ? "true" : "false"}</p>
                </>
            ) : null}
        </Item>
    )
}

export default StudentListItem;