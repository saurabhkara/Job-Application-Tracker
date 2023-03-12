import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IInputJob, IJob } from "../model/job";
import { postJob, updateJob } from "../helper/apiCalls";
import TextInputField from "./form/TextInputField";

interface IAddEditJobModelProp {
  jobToEdit?: IJob;
  closeModel: () => void;
  onJobSaved: (job: IJob) => void;
}

export default function AddEditjobModel({
  closeModel,
  onJobSaved,
  jobToEdit,
}: IAddEditJobModelProp) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IInputJob>({
    defaultValues: {
      company: jobToEdit?.company || "",
      profile: jobToEdit?.profile || "",
      platform: jobToEdit?.platform || "",
      status: jobToEdit?.status || "",
      contact: {
        email: jobToEdit?.contact?.email || "",
        mobile: jobToEdit?.contact?.mobile || "",
        hr: jobToEdit?.contact?.hr || "",
      },
    },
  });

  async function onSubmit(rawData: IInputJob) {
    let res: IJob;
    try {
      if (!jobToEdit) {
        res = await postJob(rawData);
      } else {
        res = await updateJob(jobToEdit._id, rawData);
      }
      onJobSaved(res);
    } catch (error) {
      console.log("Something Happend");
    }
  }

  return (
    <Modal show onHide={closeModel}>
      <Modal.Header closeButton>
        {jobToEdit ? "Edit Job Status" : "Add Job"}
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditEntry" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="company"
            label="Company"
            register={register}
            registerOption={{ required: "Company name required" }}
            error={errors.company}
            placeholder="Enter company name"
          />

          <TextInputField
            label="Profile"
            name="profile"
            register={register}
            error={errors.profile}
            placeholder="Enter profile"
            registerOption={{ required: "Profile required" }}
          />

          <TextInputField
            name="platform"
            label="Platform"
            register={register}
            placeholder={"Enter platform"}
          />

          <TextInputField
            name="status"
            label="Status"
            register={register}
            placeholder={"Enter Status of application"}
          />
          <TextInputField
            name="contact.hr"
            label="Hiring Manager"
            placeholder="Hiring Manager Name"
            register={register}
          />
          <TextInputField
            name="contact.email"
            label="Email"
            placeholder={"Email of hiring manager"}
            register={register}
            type="email"
          />

          <TextInputField
            name="contact.mobile"
            placeholder="Enter Mobile number"
            register={register}
            type="number"
            label="Mobile Number"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditEntry" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
