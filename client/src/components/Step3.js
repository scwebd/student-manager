import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step3 = props => (
    <FormGroup>
        <Label for="absentStudents">Who's absent?</Label>
        <Input 
            type="select" 
            name="absentStudents" 
            id="absentStudents" 
            onChange={props.handleMultiChange} 
            multiple
        >
            {props.filteredStudents.map(student => (
                <option value={student._id}>{student.name}</option>
            ))}
        </Input>
        <Button onClick={props.filterAbsentStudents} block>
            Next
        </Button>
    </FormGroup> 
);

export default Step3;