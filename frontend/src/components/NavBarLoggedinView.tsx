import React from "react";
import { IUser } from "../model/user";
import { Button, Navbar } from "react-bootstrap";
import { getLoggedOut } from "../helper/apiCalls";

interface INavbarLoggedinViewProps {
  user: IUser;
  onLogoutSuccessfull: () => void;
}

export default function NavBarLoggedinView({
  user,
  onLogoutSuccessfull,
}: INavbarLoggedinViewProps) {
  async function logout() {
    try {
      getLoggedOut();
      onLogoutSuccessfull();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar.Text>{user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
