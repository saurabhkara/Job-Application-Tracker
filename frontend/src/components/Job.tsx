import React from "react";
import styles from "../styles/jobs.module.css";
import { IJob } from "../model/job";
import { Card } from "react-bootstrap";
import formateDate from "../utils/formateDate";
import {MdDelete } from 'react-icons/md';

interface IJobProp {
  job: IJob;
  className: string;
  deleteJobEntry:(jobId:string)=>void;
  onJobClicked:(job:IJob)=>void
}

export default function Job({ job, className ,deleteJobEntry, onJobClicked}: IJobProp) {
  const { company, status, profile, contact, createdAt, updatedAt, platform } =
    job;
    let appliedOrFollowed:string;
    if(updatedAt>createdAt){
        appliedOrFollowed  = "Last followed: " + formateDate(updatedAt)
    }else{
        appliedOrFollowed ="Applied: " + formateDate(createdAt);
    }
  return (
    <Card className={`${styles.jobCard} ${className}`} onClick={()=>onJobClicked(job)}>
      <Card.Body className={styles.cardBody}>
        <Card.Title style={{justifyContent:'space-between', alignItems:'center', display:'flex'}}>{company} 
          <MdDelete 
            className="text-muted ms-auto text-red"
            color="red"
            onClick={()=>deleteJobEntry(job._id)}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{profile}</Card.Text>
        <Card.Text>{status}</Card.Text>
        <Card.Text>{platform}</Card.Text>
        <Card.Text>{contact?.hr}</Card.Text>
        <Card.Text>{contact?.mobile}</Card.Text>
        <Card.Text>{contact?.email}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {appliedOrFollowed}
      </Card.Footer>
    </Card>
  );
}
