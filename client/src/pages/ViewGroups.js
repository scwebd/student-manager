import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { Form, FormGroup } from "reactstrap";
import API from "../utils/API";
import ClassList from "../components/ClassList";

const Grouping = styled.ul`
    list-style-type: none;
    padding: 0 0 1em 0;
`

const Groups = styled.ul`
    border-bottom: 1px solid #ccc;
    margin-bottom: 1em;
    padding: 0.5em 0 1em;
    & > li {
        display: inline-block;
        list-style-type: none;
        margin: 0;
        padding: 0 3.5em 0 0;
        vertical-align: top;
        & > ul {
            padding-bottom: 1em;
        }
    }
`

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
                    <Grouping>
                        <>
                            {this.state.filteredGroups.map(grouping => 
                                <li>
                                    <h2>{grouping.name}{grouping.dateCreated ? ` (${grouping.dateCreated})` : ""}</h2>
                                    <Groups>
                                        {grouping.groups.map(group => (
                                            <li>
                                                <ul >
                                                    {group.map(student => (
                                                        <li>{student.name}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}    
                                    </Groups>
                                </li>
                            )}
                        </>
                    </Grouping>
                ) : (
                    <h3>Choose a class to see all students.</h3>
                )}
            </>
        )
    }

}

export default ViewGroups;