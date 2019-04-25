import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { Form } from "reactstrap";
import API from "../utils/API";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";

const ResetLink = styled.a`
    color: #98012e !important;
    cursor: pointer;
    text-decoration: underline !important;
    &:hover {
        color: #710829 !important;
    }
`

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

    generateGroups = event => {
        event.preventDefault();
        this.setGroups();
    }

    saveGrouping = event => {
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

    filterAbsentStudents = event => {
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

    setStep = step => this.setState({ step });

    render() {
        return (
            <>
                <Form>
                    {this.state.step === 1 ? (
                        <Step1 
                            class={this.state.class}
                            classes={this.state.classes}
                            handleInputChange={this.handleInputChange}
                            handleChooseClass={this.handleChooseClass}
                        />
                    ) : null}

                    {this.state.step === 2 ? (
                        <Step2 
                            absences={this.state.absences}
                            handleInputChange={this.handleInputChange}
                            setStep={this.setStep}
                        />
                    ) : null}

                    {this.state.step === 3 ? (
                        <Step3 
                            handleMultiChange={this.handleMultiChange}
                            filteredStudents={this.state.filteredStudents}
                            filterAbsentStudents={this.filterAbsentStudents}
                        />
                    ) : null}

                    {this.state.step === 4 ? (
                        <Step4 
                            maxSize={this.state.maxSize}
                            generateGroups={this.generateGroups}
                            class={this.state.class}
                            handleInputChange={this.handleInputChange}
                        />
                    ): null}

                </Form>
                {this.state.groups.length && this.state.step === 5 ? (
                    <Step5 
                        groupingName={this.state.groupingName}
                        handleInputChange={this.handleInputChange}
                        saveGrouping={this.saveGrouping}
                        groups={this.state.groups}
                    />
                ) : null}
                {this.state.step !== 1 ? (
                    <ResetLink onClick={(event) => { event.preventDefault(); this.setState({ step: 1, absences: null, maxSize: null, class: "" })}}>Reset Generator</ResetLink>
                ) : null}
            </>

        )
    }
}

export default GenerateGroups;