import React, { Component } from "react";
import API from "../utils/API";

class AllStudents extends Component {
    state = {
        students: []
    }

    componentDidMount() {
        API.getStudents("test-class-1")
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <ul>
                {this.state.students.map(student => 
                    <li>
                        <h3>{student.name}</h3>
                        <p>{student.location}</p>
                        <p>{student.keywords.join(" | ")}</p>
                        <p>{student.class}</p>
                        <p>New to tech? {student.isInTech ? "true" : "false"}</p>
                    </li>
                )}
            </ul>
        )
    }
}

export default AllStudents;