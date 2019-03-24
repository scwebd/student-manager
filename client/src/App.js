import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllStudents from "./pages/AllStudents";
import AddStudent from "./pages/AddStudent";
import GenerateGroups from "./pages/GenerateGroups";

class App extends Component {
    render() {
        return (
            <Router>
                <Container>
                    <>
                        <Route exact path="/" component={AllStudents} />
                        <Route exact path="/add" component={AddStudent} />
                        <Route exact path="/generate" component={GenerateGroups} />
                    </>
                </Container>
            </Router>
        );
    }
}

export default App;
