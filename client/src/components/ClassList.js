import React from "react";
import { Label, Input } from "reactstrap";

const ClassList = props => {
    return (
        <>
            <Label for="name" hidden>Choose Class</Label>
            <Input type="select" name="class" id="class" value={props.class} onChange={props.handleInputChange}>
                <option>Choose class</option>
                {props.classes.sort().map(classId => (
                    <option value={classId} key={classId}>{classId}</option>
                ))}
            </Input>
        </>
    )
}

export default ClassList;