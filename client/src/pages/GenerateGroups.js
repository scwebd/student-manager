import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";

class GenerateGroups extends Component {
    state = {
        maxSize: null,
        students: [],
        groups: []
    }

    componentDidMount() {
        API.getStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.setGroups(event);
    }

    setGroups = event => {
        event.preventDefault();

        const students = [...this.state.students];
        const size = Number(this.state.maxSize);
        const newGroups = [];

        while (students.length) {
            newGroups.push(students.splice(0, size));
        }

        const lastGroup = newGroups[newGroups.length - 1];
        // if the final group is *too* small...
        if (lastGroup.length < size - 1) {
            for (let i = 0; i < lastGroup.length; i++) {
                newGroups[i].push(lastGroup[i]);
            }
            newGroups.pop();
        }

        this.setState({ groups: newGroups });
    }

    render() {
        return (
            <>
                <Form>
                    <FormGroup>
                        <Label for="name">Max Group Size</Label>
                        <Input type="select" name="maxSize" id="maxSize" value={this.state.maxSize} onChange={this.handleInputChange}>
                            <option>Select maximum group size</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Input>
                    </FormGroup>
                    <Button onClick={this.handleFormSubmit} disabled={!this.state.maxSize}>Submit</Button>
                </Form>
                {this.state.groups.length ? (
                    <div>
                        {this.state.groups.map(group => (
                            <ul>
                                {group.map(member => (
                                    <li>{member.name}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                ) : (
                    <h3>Choose a max number of students per group and click 'submit' to generate groups.</h3>
                )}
            </>

        )
    }
}

export default GenerateGroups;