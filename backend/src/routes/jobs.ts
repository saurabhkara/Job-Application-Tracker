import { Router } from "express";
import * as jobController from "../controllers/jobController";
const router = Router();


router.get('/',jobController.getJobsController);
router.get('/:jobId',jobController.getJobController);
router.post('/',jobController.createJobController);
router.patch('/:jobId',jobController.updateJobController);
router.delete('/:jobId',jobController.deleteJobController)

export default router;