import { Worker, Job } from 'bullmq';
import { sendEmail } from '../config/Resend.config.js';
import { getWelcomeLoginTemplate } from "../templates/index.js";

const registerEmailWorker  = new Worker("")


