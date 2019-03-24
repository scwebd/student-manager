import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";

class GenerateGroups extends Component {
    state = {
        maxSize: null,
        students: [],
        classes: [],
        groups: [],
        class: "",
        groupingName: ""
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

    handleGenerateSubmit = event => {
        event.preventDefault();
        this.setGroups();
    }

    handleGroupingSubmit = event => {
        event.preventDefault();

        const grouping = {
            name: this.state.groupingName,
            class: this.state.class,
            groups: this.state.groups,
        }

        API.createGrouping(grouping)
            .then(res => alert("saved"))
            .catch(err => console.log(err));
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
                        <ClassList 
                            classes={this.state.classes}
                            class={this.state.class}
                            handleInputChange={this.handleInputChange}
                        />
                        <Label for="name" hidden>Choose Max Group Size</Label>
                        <Input type="select" name="maxSize" id="maxSize" value={this.state.maxSize} onChange={this.handleInputChange}>
                            <option>Choose max group size</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Input>
                    </FormGroup>
                    <Button onClick={this.handleGenerateSubmit} disabled={!this.state.maxSize || !this.state.class}>Generate Groups</Button>
                </Form>
                {this.state.groups.length ? (
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="groupingName" hidden>Choose Name for this Grouping</Label>
                                <Input 
                                    type="text" 
                                    name="groupingName" 
                                    placeholder="Grouping Name"
                                    value={this.state.groupingName}
                                    onChange={this.handleInputChange} 
                                />
                            </FormGroup>
                            <Button onClick={this.handleGroupingSubmit} disabled={!this.state.groupingName}>Save Grouping</Button> 
                        </Form>
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