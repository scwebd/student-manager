import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import AddStudent from "./pages/AddStudent";

class App extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <AddStudent />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
