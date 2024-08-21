import { Router } from 'express';
import {
  getPath,
  readFile,
  seletedForTable,
  duplicateMatricula,
  chargeFile,
} from "./controller.js";

export function router(app){
  const router = Router();
  app.use('/', router);
  router.get("/path", getPath);
  router.get("/table/:table", seletedForTable);
  router.get("/duplicateMatricula", duplicateMatricula);
  router.post("/", readFile);
  router.post("/charge", chargeFile);
}