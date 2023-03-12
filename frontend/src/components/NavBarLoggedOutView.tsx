import React from "react";
import { Button } from "react-bootstrap";

interface INavLoggedOutViewProp {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export default function NavBarLoggedOutView({
  onSignUpClick,
  onLoginClick,
}: INavLoggedOutViewProp) {
  return (
    <>
      <Button onClick={onLoginClick}>Login</Button>
      <Button onClick={onSignUpClick}>Sign up</Button>
    </>
  );
}
