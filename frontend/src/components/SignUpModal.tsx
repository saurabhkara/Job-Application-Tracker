import React from "react";
import styles from "../styles/signup.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { getSignUp } from "../helper/apiCalls";
import { useForm } from "react-hook-form";
import { IInputSignUp , IUser} from "../model/user";
import TextInputField from "./form/TextInputField";

interface ISignUpProps {
  onClose: () => void;
  onSuccessfullSignup:(user:IUser)=>void
}

export default function SignUpModal({ onClose, onSuccessfullSignup}: ISignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IInputSignUp>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(data: IInputSignUp) {
    try {
      const res:IUser = await getSignUp(data);
      console.log(res);
      onSuccessfullSignup(res);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton className={styles.header}>
        Sign up
      </Modal.Header>
      <Modal.Body>
        <Form id="submitForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            label="Email"
            name="email"
            register={register}
            registerOption={{ required: "Email required for sign up" }}
            error={errors.email}
            type="email"
            placeholder="Enter your email"
          />
          <TextInputField
            label="Username"
            name="username"
            register={register}
            registerOption={{ required: "Username required" }}
            error={errors.username}
            type="text"
            placeholder="Enter your username"
          />
          <TextInputField
            label="Password"
            name="password"
            register={register}
            registerOption={{ required: "Password required" }}
            error={errors.password}
            type="password"
            placeholder="Enter ypur password"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="submitForm" type="submit" disabled={isSubmitting}>Sign up</Button>
      </Modal.Footer>
    </Modal>
  );
}
