import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Page not found</h1>
      <Link to={"/"}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
