import React from "react";
import styled from "styled-components";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const GroupWrapper = styled.ul`
    display: inline-block;
    padding: 0 3.5em 0 40px;
    vertical-align: top;
    & > li {
        list-style-type: square; 
 
    }
`

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
            <GroupWrapper>
                {group.map(member => (
                    <li>{member.name}</li>
                ))}
            </GroupWrapper>
        ))}
    </div>
);

export default Step5;