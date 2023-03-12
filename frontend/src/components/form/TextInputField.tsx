import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface ITextInputFieldProp {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOption?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

export default function TextInputField({
  name,
  label,
  register,
  registerOption,
  error,
  ...props
}: ITextInputFieldProp) {
  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOption)}
        isInvalid={!!error}
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
