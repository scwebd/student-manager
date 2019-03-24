import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";

class GenerateGroups extends Component {
    state = {
        maxSize: null,
        students: [],
        classes: [],
        groups: [],
        class: ""
    }

    componentDidMount() {
        API.getStudents()
            .then(res => {
                const classes = [...new Set(res.data.map(student => student.class))];
                this.setState({ students: res.data, classes });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.setGroups();
    }

    shuffleArr = arr => {
        let currentIndex = arr.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = arr[currentIndex];
          arr[currentIndex] = arr[randomIndex];
          arr[randomIndex] = temporaryValue;
        }
        return arr;
    }

    setGroups = () => {
        const size = Number(this.state.maxSize);
        const newGroups = [];
        let students = this.state.students.filter(student => student.class === this.state.class);
        students = this.shuffleArr(students);

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
                        {this.state.classes.length ? (
                            <>
                                <Label for="name" hidden>Choose Class</Label>
                                <Input type="select" name="class" id="class" value={this.state.class} onChange={this.handleInputChange}>
                                    <option>Choose class</option>
                                    {this.state.classes.map(classId => (
                                        <option value={classId}>{classId}</option>
                                    ))}
                                </Input>
                            </>
                        ) : null}
                        <Label for="name" hidden>Choose Max Group Size</Label>
                        <Input type="select" name="maxSize" id="maxSize" value={this.state.maxSize} onChange={this.handleInputChange}>
                            <option>Choose max group size</option>
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