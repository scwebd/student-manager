import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Step5 = props => (
    <div>
        <Form>
            <FormGroup>
                <Label for="groupingName" hidden>Choose Name for this Grouping</Label>
                <Input
                    type="text"
                    name="groupingName"
                    placeholder="Grouping Name"
                    value={props.groupingName}
                    onChange={props.handleInputChange}
                />
            </FormGroup>
            <Button 
                onClick={props.saveGrouping} 
                disabled={!props.groupingName}
                block
            >
                Save Grouping
            </Button>
        </Form>
        {props.groups.map(group => (
            <ul>
                {group.map(member => (
                    <li>{member.name}</li>
                ))}
            </ul>
        ))}
    </div>
);

export default Step5;