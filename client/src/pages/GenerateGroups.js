import React, { Component } from "react";
import moment from "moment";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";

class GenerateGroups extends Component {
    state = {
        step: 1,
        maxSize: null,
        absences: null,
        students: [],
        absentStudents: [],
        filteredStudents: [],
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

    handleMultiChange = event => {
        const { value, options } = event.target;
        const ids = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                ids.push(options[i].value);
            }
        }

        this.setState({ absentStudents: ids });
    }

    handleChooseClass = event => {
        event.preventDefault();
        let filteredStudents = this.state.students.filter(student => student.class === this.state.class);
        this.setState({ filteredStudents, step: 2 });
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
            dateCreated: moment().format("LL")
        }

        API.createGrouping(grouping)
            .then(res => alert("saved"))
            .catch(err => console.log(err));
    }

    filterOutAbsentStudents = event => {
        event.preventDefault();
        let filteredStudents = this.state.filteredStudents.filter(student => !this.state.absentStudents.includes(student._id));
        this.setState({ filteredStudents, step: 4 });        
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
        let students = [...this.state.filteredStudents];
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

        this.setState({ groups: newGroups, step: 5 });
    }

    render() {
        return (
            <>
                {this.state.step !== 1 ? (
                    <a onClick={(event) => { event.preventDefault(); this.setState({ step: 1 })}}>Reset Generator</a>
                ) : null}
                <Form>
                    {this.state.step === 1 ? (
                        <FormGroup>
                            <ClassList
                                classes={this.state.classes}
                                class={this.state.class}
                                handleInputChange={this.handleInputChange}
                            />
                            <Button 
                                onClick={this.handleChooseClass} 
                                disabled={!this.state.class}
                                block
                            >Choose Class</Button>
                        </FormGroup>
                    ) : null}

                    {this.state.step === 2 ? (
                        <>
                            <legend className="col-form-label">Is anyone absent today?</legend>
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="absences"
                                        value="true"
                                        onChange={this.handleInputChange}
                                        checked={this.state.absences === "true"}
                                    />{' '}Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="absences"
                                        value="false"
                                        onChange={this.handleInputChange}
                                        checked={this.state.absences === "false"}
                                    />{' '}No
                                </Label>
                            </FormGroup>
                            <Button 
                                onClick={() => this.setState({ step: this.state.absences === "true" ? 3 : 4 })}
                                disabled={!this.state.absences}
                                block
                            >
                                {this.state.absences === "true" ? "Choose Absent Students" : "Onward!"}
                            </Button>
                        </>
                    ) : null}

                    {this.state.step === 3 ? (
                        <FormGroup>
                            <Label for="absentStudents">Who's absent?</Label>
                            <Input type="select" name="absentStudents" id="absentStudents"  onChange={this.handleMultiChange} multiple>
                                {this.state.filteredStudents.map(student => (
                                    <option value={student._id}>{student.name}</option>
                                ))}
                            </Input>
                            <Button 
                                onClick={this.filterOutAbsentStudents} 
                                block
                            >
                                Next
                            </Button>
                        </FormGroup>                        
                    ) : null}

                    {this.state.step === 4 ? (
                        <FormGroup>
                            <Label for="name" hidden>Choose Max Group Size</Label>
                            <Input type="select" name="maxSize" id="maxSize" value={this.state.maxSize} onChange={this.handleInputChange}>
                                <option>Choose max group size</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Input>
                            <Button 
                                onClick={this.handleGenerateSubmit} 
                                disabled={!this.state.maxSize || !this.state.class}
                                block
                            >
                                Generate Groups
                            </Button>
                        </FormGroup>
                    ): null}

                </Form>
                {this.state.groups.length && this.state.step === 5 ? (
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
                            <Button 
                                onClick={this.handleGroupingSubmit} 
                                disabled={!this.state.groupingName}
                                block
                            >
                                Save Grouping
                            </Button>
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