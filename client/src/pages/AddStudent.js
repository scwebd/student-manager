import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../utils/API";

class AddStudent extends Component {
    state = {
        name: "",
        location: "",
        keywords: "",
        class: "",
        classes: [],
        isInTech: null
    }

    componentDidMount() {
        API.getStudents()
            .then(res => {
                const classes = [...new Set(res.data.map(student => student.class))];
                this.setState({ classes });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const student = {
            name: this.state.name,
            location: this.state.location,
            keywords: this.state.keywords.split(", "),
            class: this.state.class,
            isInTech: this.state.isInTech === "true"
        }

        API.createStudent(student)
            .then(res => this.props.history.push(`/`))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            placeholder="Jane Doe"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            id="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            placeholder="Somewhere, CO"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="keywords">Keywords</Label>
                        <Input
                            type="text"
                            name="keywords"
                            id="keywords"
                            value={this.state.keywords}
                            onChange={this.handleInputChange}
                            placeholder="Has 2 cats, likes tacos"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="class">Class</Label>
                        <Input
                            type="text"
                            list="classes"
                            name="class"
                            id="class"
                            value={this.state.class}
                            onChange={this.handleInputChange}
                            placeholder="UDEN201902-FT"
                        />
                        <datalist id="classes">
                            {this.state.classes.map(classId => (
                                <option value={classId}>{classId}</option>
                            ))}
                        </datalist>
                    </FormGroup>
                    <legend className="col-form-label">Currently in tech industry?</legend>
                    <FormGroup check inline>
                        <Label check>
                            <Input
                                type="radio"
                                name="isInTech"
                                value="true"
                                onChange={this.handleInputChange}
                                checked={this.state.isInTech === "true"}
                            />{' '}Yes
                        </Label>
                    </FormGroup>
                    <FormGroup check inline>
                        <Label check>
                            <Input
                                type="radio"
                                name="isInTech"
                                value="false"
                                onChange={this.handleInputChange}
                                checked={this.state.isInTech === "false"}
                            />{' '}No
                      </Label>
                    </FormGroup>
                    <Button block onClick={this.handleFormSubmit}>Submit</Button>
                </Form>
            </>
        )
    }
}

export default AddStudent;