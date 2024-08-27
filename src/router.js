import { Router } from 'express';
import {
  getPath,
  readFile,
  seletedForTable,
  duplicateCURP,
  chargeFile,
  verifyBirthdate,
  gender,
  duplicateMatricula
} from "./controller.js";

export function router(app){
  const router = Router();
  app.use('/', router);
  router.get("/path", getPath);
  router.get("/table/:table", seletedForTable);
  router.get("/duplicateMatricula", duplicateMatricula);
  router.get("/duplicateCurp", duplicateCURP);
  router.get("/verifyBirthdate", verifyBirthdate);
  router.get("/verifyGender", gender);
  router.post("/", readFile);
  router.post("/charge", chargeFile);
}
