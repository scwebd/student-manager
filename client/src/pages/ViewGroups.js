import React, { Component } from "react";
import moment from "moment";
import { Form, FormGroup } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";

class ViewGroups extends Component {
    state = {
        groups: [],
        filteredGroups: [],
        classes: [],
        class: ""
    }

    componentDidMount() {
        API.getGroups()
            .then(res => {
                console.log(res.data)
                const classes = [...new Set(res.data.map(grouping => grouping.class))];
                this.setState({ groups: res.data, classes });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const filteredGroups = this.state.groups.filter(group => group.class === event.target.value);
        this.setState({ class: event.target.value, filteredGroups });
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
                {this.state.filteredGroups.length ? (
                    <ul>
                        <>
                            {this.state.filteredGroups.map(grouping => 
                                <li>
                                    <h2>{grouping.name}{grouping.dateCreated ? `, saved ${grouping.dateCreated}` : ""}</h2>
                                    <ul>
                                        {grouping.groups.map(group => (
                                            <li>
                                                <ul>
                                                    {group.map(student => (
                                                        <li>{student.name}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}    
                                    </ul>
                                </li>
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

export default ViewGroups;