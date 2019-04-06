import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ViewStudents from "./pages/ViewStudents";
import AddStudent from "./pages/AddStudent";
import ViewGroups from "./pages/ViewGroups";
import GenerateGroups from "./pages/GenerateGroups";
import GenerateRandomStudent from "./pages/GenerateRandomStudent";

class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <Route component={NavBar} />
                    <Container>
                        
                            <Route exact path="/" component={ViewStudents} />
                            <Route exact path="/add" component={AddStudent} />
                            <Route exact path="/groups" component={ViewGroups} />
                            <Route exact path="/generate" component={GenerateGroups} />
                            <Route exact path="/random" component={GenerateRandomStudent} />
                        
                    </Container>
                </>
            </Router>
        );
    }
}

export default App;
