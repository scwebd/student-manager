import React from "react";
import { FormGroup, Button } from "reactstrap";
import ClassList from "./ClassList";

const Step1 = props => (
    <FormGroup>
        <ClassList
            classes={props.classes}
            class={props.class}
            handleInputChange={props.handleInputChange}
        />
        <Button 
            onClick={props.handleChooseClass} 
            disabled={!props.class}
            block
        >Choose Class</Button>
    </FormGroup>
);

export default Step1;