import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step4 = props => (
    <FormGroup>
        <Label for="name" hidden>Choose Max Group Size</Label>
        <Input 
            type="select" 
            name="maxSize" 
            id="maxSize" 
            value={props.maxSize} 
            onChange={props.handleInputChange}
        >
            <option>Choose max group size</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </Input>
        <Button 
            onClick={props.generateGroups} 
            disabled={!props.maxSize || !props.class}
            block
        >
            Generate Groups
        </Button>
    </FormGroup>
);

export default Step4;