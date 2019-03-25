import React, { Component } from "react";
import { Form, FormGroup } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";
import StudentListItem from "../components/StudentListItem";

class ViewStudents extends Component {
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
                        <ClassList 
                                classes={this.state.classes}
                                class={this.state.class}
                                handleInputChange={this.handleInputChange}
                            />
                    </FormGroup>
                </Form>
                {this.state.filteredStudents.length ? (
                    <ul>
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
                    </ul>
                ) : (
                    <h3>Choose a class to see all students.</h3>
                )}
            </>
        )
    }
}

export default ViewStudents;