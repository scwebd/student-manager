import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavBar = () => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink href="/" active={window.location.pathname === "/"}>View Students</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/add" active={window.location.pathname === "/add"}>Add Student</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/generate" active={window.location.pathname === "/generate"}>Generate Groups</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavBar;