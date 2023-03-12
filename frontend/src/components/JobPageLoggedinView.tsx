import React, { useState, useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import AddEditjobModel from "./AddEditjobModel";
import { IJob } from "../model/job";
import styles from "../styles/jobsPage.module.css";
import { deleteJob, getAllJobs } from "../helper/apiCalls";
import Job from "./Job";

export default function JobPageLoggedinView() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<null | IJob>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function call() {
      try {
        setIsLoading(true);
        const res = await getAllJobs();
        console.log(res);
        setJobs(res);
      } catch (error) {
        console.log("error occurred in catch block", error);
        setError("Oops!! Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
    call();
  }, []);

  async function deleteJobEntry(jobId: string) {
    try {
      console.log(typeof jobId);
      await deleteJob({ jobId: jobId });
      setJobs(jobs.filter((item) => item._id !== jobId));
    } catch (error) {
      console.log("error occurred in catch block");
    }
  }

  const jobC = (
    <Row xs={1} md={2} xl={3} className={`g-4`}>
      {jobs.map((item, index) => {
        return (
          <Col key={index}>
            <Job
              job={item}
              className={styles.job}
              deleteJobEntry={deleteJobEntry}
              onJobClicked={setJobToEdit}
            />
          </Col>
        );
      })}
    </Row>
  );

  return (
    <>
      <div style={{ marginBottom: 15, marginTop: 15 }}>
        <Button
          onClick={() => setOpenCloseModal(true)}
          style={{ marginLeft: "40%" }}
        >
          Add Job
        </Button>
      </div>

      {isLoading && (
        <div className={styles.jobPage}>
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      )}
      {error && <p className={styles.jobPage}>{error}</p>}
      {!isLoading && !error && (
        <>
          {jobs.length === 0 ? <p>You have not applied anywhere yet</p> : jobC}
        </>
      )}
      {openCloseModal && (
        <AddEditjobModel
          closeModel={() => setOpenCloseModal(false)}
          onJobSaved={(job) => {
            setOpenCloseModal(false);
            setJobs((prev) => [...prev, job]);
          }}
        />
      )}

      {jobToEdit && (
        <AddEditjobModel
          jobToEdit={jobToEdit}
          closeModel={() => setJobToEdit(null)}
          onJobSaved={(job) => {
            setJobToEdit(null);
            setJobs(jobs.map((item) => (item._id === job._id ? job : item)));
          }}
        />
      )}
    </>
  );
}
