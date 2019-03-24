import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";
import StudentListItem from "../components/StudentListItem";

class GenerateRandomStudent extends Component {
    state = {
        students: [],
        filteredStudents: [],
        classes: [],
        class: "",
        randomStudent: null
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
        const filteredStudents = this.state.students.filter(student => student.class === event.target.value);
        this.setState({ class: event.target.value, filteredStudents });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const students = this.state.filteredStudents;
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        this.setState({ randomStudent });
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
                    </FormGroup>
                    <Button onClick={this.handleFormSubmit} disabled={!this.state.class}>Submit</Button>
                </Form>
                {this.state.randomStudent ? (
                    <ul>
                        <StudentListItem 
                            name={this.state.randomStudent.name}
                            location={this.state.randomStudent.location}
                            keywords={this.state.randomStudent.keywords}
                            class={this.state.randomStudent.class}
                            isInTech={this.state.randomStudent.isInTech} />
                    </ul>
                ) : (
                    <h3>Choose a class and click 'submit' to generate a random student.</h3>
                )}
            </>
        )
    }
}

export default GenerateRandomStudent;