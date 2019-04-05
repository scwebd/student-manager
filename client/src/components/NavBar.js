import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import styled from "styled-components";

const red = "#98012e";
const gold = "#8b6e4a";
const white = "#fff";
const gray = "#e6e6e6";
const Nav = styled("div")`
    background: ${red};
    border-bottom: 5px solid ${gold};
    margin-bottom: 1rem;
    position: relative;
    top: -5px
    ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    li {
        border-bottom: 5px solid ${gold};
        cursor: pointer;
        font-weight: 400;
        margin-bottom: -5px;
        &.active {
            background: ${gray};
            border-bottom-color: ${red}
            font-weight: 700;
            a {
                color: #333;
            }
        }
        &:hover {
            background: ${gray};
            a {
                color: #333;
            }
        }

        a {
            color: ${white};
            display: inline-block;
            font-family: 'Cabin', sans-serif;
            font-size: 0.9rem;
            padding: 1rem 0.75rem 0.75rem;
            &:hover {
                text-decoration: none;
            }
        }
    }
`


const NavBar = () => {
    return (
        <Nav>
            <Container>
                <ul>
                    <li className={window.location.pathname === "/" ? "active" : null}>
                        <Link to="/">View Students</Link>
                    </li>
                    <li className={window.location.pathname === "/add" ? "active" : null}>
                        <Link to="/add">Add Student</Link>
                    </li>
                    <li className={window.location.pathname === "/groups" ? "active" : null}>
                        <Link to="/groups">View Groups</Link>
                    </li>
                    <li className={window.location.pathname === "/generate" ? "active" : null}>
                        <Link to="/generate">Generate Groups</Link>
                    </li>
                    <li className={window.location.pathname === "/random" ? "active" : null}>
                        <Link to="/random">Generate Random Student</Link>
                    </li>
                </ul>
            </Container>
        </Nav>
    )
}

export default NavBar;