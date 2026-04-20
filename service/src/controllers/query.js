// const { request, response } = require("express");
import { request, response } from "express";
import queries from "../queries";
// const queries = require("../queries");

exports.getUpsetData = (request, response) => {
  queries.getUpsetData(request, response);
};
exports.getSingleData = (request, response) => {
  queries.getSingleData(request, response);
};

exports.getUpdatedData = (request, response) => {
  queries.getUpdatedData(request, response);
};
