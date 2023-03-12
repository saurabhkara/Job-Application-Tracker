import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IUser } from "../model/user";
import NavBarLoggedinView from "./NavBarLoggedinView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link} from 'react-router-dom';

interface INavbarProps {
  loggedInuser: IUser | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessfull: () => void;
}

export default function NavBar({
  loggedInuser,
  onSignUpClicked,
  onLogoutSuccessfull,
  onLoginClicked,
}: INavbarProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to='/'>Job Application Tracker</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="ms-auto">
          {loggedInuser ? (
            <NavBarLoggedinView
              onLogoutSuccessfull={onLogoutSuccessfull}
              user={loggedInuser}
            />
          ) : (
            <NavBarLoggedOutView
              onLoginClick={onLoginClicked}
              onSignUpClick={onSignUpClicked}
            />
          )}
        </Nav>
      </Navbar.Collapse>
      
      </Container>
    </Navbar>
  );
}
