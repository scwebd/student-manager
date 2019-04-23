import React, { Component } from "react";
import { Form, FormGroup, Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";
import StudentListItem from "../components/StudentListItem";

class ViewStudents extends Component {
    state = {
        students: [],
        filteredStudents: [],
        classes: [],
        class: "",
        displayFull: false,
        modal: false,
        idToDelete: ""
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents = () => {
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

    toggleDeleteModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    setIdToDelete = id => {
        this.setState({ idToDelete: id });
    }

    deleteStudent = () => {
        this.toggleDeleteModal();
        API.deleteStudent(this.state.idToDelete)
            .then(res => { 
                const filteredStudents = this.state.filteredStudents.filter(student => student._id !== this.state.idToDelete);
                this.setState({ filteredStudents });
            })
            .catch(err => console.log(err));
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
                    <>
                        {/* {!this.state.displayFull ? (
                            <a onClick={() => this.setState({ displayFull: true })}>Display full</a>
                        ) : (
                            <a onClick={() => this.setState({ displayFull: false })}>Display name only</a>
                        )} */}
                        <Modal isOpen={this.state.modal} toggle={this.toggleDeleteModal}>
                            <ModalBody>Delete?</ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.deleteStudent}>Delete</Button>{' '}
                                <Button color="warning" onClick={this.toggleDeleteModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <ul style={{ paddingLeft: 0 }}>
                            <>
                                {this.state.filteredStudents.map(student =>
                                    <StudentListItem
                                        canDelete={true}
                                        name={student.name}
                                        location={student.location}
                                        keywords={student.keywords}
                                        class={student.class}
                                        isInTech={student.isInTech}
                                        toggleDeleteModal={this.toggleDeleteModal}
                                        setIdToDelete={this.setIdToDelete}
                                        id={student._id}
                                        full={this.state.displayFull}
                                        key={student._id}
                                    />
                                )}
                            </>
                        </ul>
                    </>
                ) : (
                        <h3>Choose a class to see all students.</h3>
                    )}
            </>
        )
    }
}

export default ViewStudents;