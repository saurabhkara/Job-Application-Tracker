import React from "react";
import { IUser } from "../model/user";
import JobPageLoggedinView from "../components/JobPageLoggedinView";
import NoJob from "../components/NoJob";

interface IProtectProps {
  user: IUser | null;
}

export default function ProtectRoute({ user }: IProtectProps) {
  if (user) {
    return <JobPageLoggedinView />;
  }
  return <NoJob />;
}
