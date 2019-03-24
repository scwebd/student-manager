import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";
import StudentListItem from "../components/StudentListItem";

class AllStudents extends Component {
    state = {
        students: [],
        filteredStudents: [],
        classes: [],
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
        const filteredStudents = this.state.students.filter(student => student.class === event.target.value);
        this.setState({ class: event.target.value, filteredStudents });
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
                        ) : (
                            null
                        )}
                    </FormGroup>
                </Form>
                {this.state.filteredStudents.length ? (
                    <ul>
                        {this.state.filteredStudents.length ? (
                            <>
                            {this.state.filteredStudents.map(student => 
                                <StudentListItem 
                                    name={student.name}
                                    location={student.location}
                                    keywords={student.keywords}
                                    class={student.class}
                                    isInTech={student.isInTech} />
                            )}
                            </>
                        ) : null}
                    </ul>
                ) : (
                    <h3>Choose a class to see all students.</h3>
                )}
            </>
        )
    }
}

export default AllStudents;