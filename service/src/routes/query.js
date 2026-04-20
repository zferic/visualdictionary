import express from "express";
import { getSingleData, getUpsetData, getUpdatedData } from "../queries.js";
// import { getUpsetData, getSingleData } from "../controllers/query";
// const {
//   getTableCount,
//   getNearestNeighbour,
//   selectQueries,
//   getUpsetData,
//   getSingleData,
// } = require("../controllers/query");

const router = express.Router();

// GET — / | displayHome()

// My routesa
router.get("/upsetData/:variables", (request, response) => {
  getUpsetData(request, response);
});
router.get("/singleData/:vars", (request, response) => {
  getSingleData(request, response);
});
router.get("/updateData", (request, response) => {
  getUpdatedData(request, response);
});

export default router;
