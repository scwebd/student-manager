import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step2 = props => (
    <>
        <legend className="col-form-label">Is anyone absent today?</legend>
        <FormGroup check inline>
            <Label check>
                <Input
                    type="radio"
                    name="absences"
                    value="true"
                    onChange={props.handleInputChange}
                    checked={props.absences === "true"}
                />{' '}Yes
            </Label>
        </FormGroup>
        <FormGroup check inline>
            <Label check>
                <Input
                    type="radio"
                    name="absences"
                    value="false"
                    onChange={props.handleInputChange}
                    checked={props.absences === "false"}
                />{' '}No
            </Label>
        </FormGroup>
        <Button 
            onClick={() => props.setStep(props.absences === "true" ? 3 : 4 )}
            disabled={!props.absences}
            block
        >
            {props.absences === "true" ? "Choose Absent Students" : "Onward!"}
        </Button>
    </>
);

export default Step2;