// Check if the saves here work on remote s

// const Pool = require("pg").Pool;

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

// const keys = require("./keys");
import { Connection } from "tedious";
// var Connection = require("tedious").Connection;
import sql from "mssql";
// const sql = require("mssql");
/*eslint-disable */
import * as d3 from "d3";
/*eslint-enable */
import { generateCombinations, extractCombinations } from "@upsetjs/react";
import { response } from "express";
console.log('hey')
var dataString =
  "SELECT t.name, t.[modify_date] FROM table_updatetime t";


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT) || 61235,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 1000,
  },
  options: {
    trustServerCertificate: true,
    rowCollectionOnRequestCompletion: true,
  },
};
console.log(config)

export async function getUpdatedData(req, response) {
  try {
    const rec = req;
    let pool = await sql.connect(config);
    console.log(pool)
    const res1 = await pool.request().query(string);
    console.log(res1)
    response.send(res1);
  } catch (error) {
    console.error("Error in start()::", error);
  }
}

export async function getSingleData(req, response) {
  try {
    const updateDictinary = {
      initial_screening: "screening",
      consent_form: "consent",
      first_visit: "first_visit",
      inhome_visit: "secondvisit_1stpart",
      inhome_visit_2nd_part: "secondvisit_2ndpart",
      geographical_coordinates: "geo_coordinates",
      food_frequency: "foodfrequency",
      third_visit: "thirdvisit",
      med_rec_v1: "medrec_v1",
      med_rec_v3: "medrec_v3",
      product_use: "product_use",
      status_participante: "status",
      birth: "pregn_outcome",
      postpartum_data_abstraction: "postpartum_data_abstraction",
      postpartum_interview: "postpartum_interv",
      edd_confirmation: "edd_confirmation",
    };

    let bioUpdate = {
      Phenols: "Phenols",
      Phthalates: "Phthalates",
      Metal_Urine: "Metals Urine",
      PAH: "PAH",
      Hormones: "Hormones",
      Oxidative_Stress: "Oxidative Stress",
      Inflammation: "Inflammation",
      Glyphosate: "Glyphosate",
      OP_Flame_Retardant: "OP Flame Retardant",
      Metal_Blood: "Metals Blood",
      OP_pesticides: "OP pesticides",
      Eicosanoid: "Eicosanoid",
      CRP: "CRP",
      Cytokines: "Cytokines",
      CAMs: "CAMS",
      MMPs: "MMPs",
    };
    let pool = await sql.connect(config);
    const res2 = await pool.request().query(dataString);

    var updateDict = res2["recordsets"][0];

    var variables = req.params.vars;

    let variableObject = [];

    variableObject[0] = variables.split(",")[0];
    variableObject[1] = variables.split(",")[1];
    variableObject[2] = variables.split(",")[2];

    if (variableObject[2] == "Environmental Data") {
      var lastUpdate = "";
      for (let n of updateDict) {
        if (n.name == "dt_" + variableObject[1].toString()) {
          lastUpdate = n["modify_date"];
          break;
        } else {
          lastUpdate = "No Data";
        }
      }

      let count = 0;
      let totalNumbers = 0;
      let sendData = [];
      let xArray = [[], [], []];

      let sendingMaterial = {
        count: count,
        totalNumbers: totalNumbers,
        sendData: sendData,
        xArray: xArray,
        lastUpdated: lastUpdate,
      };
      response.send(sendingMaterial);
    }
    // -------------------Biological -------------------------
    if (variableObject[2] == "Biological Data") {
      var lastUpdate = "";
      for (let n of updateDict) {
        if (n.name == "dt_" + variableObject[1].toString()) {
          lastUpdate = n["modify_date"];
          break;
        } else {
          lastUpdate = "No Data";
        }
      }

      let pool = await sql.connect(config);
      let bioString =
        "DECLARE	@return_value int EXEC	@return_value = [v54].[006_biological_report_inclusion_visitid]";
      let bioTable = await pool.request().query(bioString);
      variableObject[4] = bioUpdate[variables.split(",")[4]];
      variableObject[3] = variables.split(",")[3];

      let count = 0;
      let totalNumbers = 0;
      let recordSet = bioTable["recordset"];
      recordSet.forEach((element, index, array) => {
        if (Object.keys(recordSet[0]).length == 18) {
          if (
            element[variableObject[4]] == 1 &&
            element["visitid"] == variableObject[3]
          ) {
            count = count + 1;
            totalNumbers = totalNumbers + 1;
          }
          if (
            element[variableObject[4]] == 0 &&
            element["visitid"] == variableObject[3]
          ) {
            totalNumbers = totalNumbers + 1;
          }
        }
      });

      let sendData = [];
      let xArray = [[], [], []];

      let sendingMaterial = {
        count: count,
        totalNumbers: totalNumbers,
        sendData: sendData,
        xArray: xArray,
        lastUpdated: lastUpdate,
      };
      response.send(sendingMaterial);
    }
    // ----------------------Human Subject-------------------------
    if (variableObject[2] == "Human Subject Data") {
      var lastUpdate = "";
      for (let n of updateDict) {
        if (n.name == "dt_" + variableObject[1].toString()) {
          lastUpdate = n["modify_date"];
          break;
        } else {
          lastUpdate = "No Data";
        }
      }
      variableObject[1] = updateDictinary[variables.split(",")[1]];
      variableObject[2] = variables.split(",")[2];

      if (!variableObject[1]) {
        variableObject[1] = variableObject[0];
      }

      let string =
        "SELECT SYS_LOC_CODE, " +
        variableObject[0].toString() +
        " FROM dbo.dt_" +
        variableObject[1].toString();

      console.log(string);

      var allAnswers = [];

      const res1 = await pool.request().query(string);

      allAnswers.push(res1);

      /*..And so on with rest of sequential queries*/
      /*Any of them resulting in error will be caught in (catch)*/

      var totalNumbers = allAnswers[0]["rowsAffected"][0];
      let records = allAnswers[0]["recordsets"][0];

      let histData = [];
      let count = 0;
      for (let r of records) {
        if (r[variableObject[0].toString()] !== null) {
          count = count + 1;
          histData.push(r[variableObject[0].toString()]);
        }
      }

      function countUnique(iterable) {
        return new Set(iterable).size;
      }

      let unique = countUnique(histData);

      let numBins = 0;
      if (unique > 5) {
        numBins = 5;
      } else {
        numBins = unique;
      }
      let bin1 = d3.bin().thresholds(numBins);
      let sendData = bin1(histData);
      let xArray = [];
      for (let s of sendData) {
        let smallArr = [];

        smallArr.push(s.x0, s.x1, s.length);
        xArray.push(smallArr);
      }

      let sendingMaterial = {
        count: count,
        totalNumbers: totalNumbers,
        sendData: sendData,
        xArray: xArray,
        lastUpdated: lastUpdate,
      };
      response.send(sendingMaterial);
    }
  } catch (error) {
    console.error("Error in start()::", error);
  }
}

export async function getUpsetData(req, response) {
  try {
    const updateDictinary = {
      initial_screening: "screening",
      consent_form: "consent",
      first_visit: "first_visit",
      inhome_visit: "secondvisit_1stpart",
      inhome_visit_2nd_part: "secondvisit_2ndpart",
      geographical_coordinates: "geo_coordinates",
      food_frequency: "foodfrequency",
      third_visit: "thirdvisit",
      med_rec_v1: "medrec_v1",
      med_rec_v3: "medrec_v3",
      product_use: "product_use",
      status_participante: "status",
      birth: "pregn_outcome",
      postpartum_data_abstraction: "postpartum_data_abstraction",
      postpartum_interview: "postpartum_interv",
      edd_confirmation: "edd_confirmation",
      Phenols: "Phenols",
      Phthalates: "Phthalates",
      Metal_Urine: "Metals Urine",
      PAH: "PAH",
      Hormones: "Hormones",
      Oxidative_Stress: "Oxidative Stress",
      Inflammation: "Inflammation",
      Glyphosate: "Glyphosate",
      OP_Flame_Retardant: "OP Flame Retardant",
      Metal_Blood: "Metals Blood",
      OP_pesticides: "OP pesticides",
      Eicosanoid: "Eicosanoid",
      CRP: "CRP",
      Cytokines: "Cytokines",
      CAMs: "CAMS",
      MMPs: "MMPs",
    };
    const environmentalArray = [
      "well_site",
      "waterquality_data",
      "phthalate_data",
      "nitrate_data",
      "CVOC_data",
      "metalanalysis_data",
      "spring_site",
      "site",
    ];
    var variables = req.params.variables;

    var variables = variables.split("xxx");
 

    if (variables[variables.length - 1] == "") {
      variables.pop();
    }
    let variableObject = {};
    let count = 0;

    for (let v of variables) {
      console.log(v);
      if (environmentalArray.includes(v.split(",")[1])) {
        continue;
      }
      if (v.split(",")[2] == "") {
        if (v.split(",")[1] in updateDictinary) {
          variableObject[count] = [
            updateDictinary[v.split(",")[1]],
            v.split(",")[0],
          ];
        } else {
          variableObject[count] = [v.split(",")[1], v.split(",")[0]];
        }
      } else {
        variableObject[count] = [
          v.split(",")[1],
          parseInt(v.split(",")[2]),
          updateDictinary[v.split(",")[3]],
        ];
      }
      count = count + 1;
    }
    // console.log(variableObject);

    var queries = [];
    var bioQueries = [];
    let bioVariables = [];
    var allAnswers = [];
    for (let obj in variableObject) {
      let string = "";
      if (variableObject[obj].length == 3) {
        let checkObj = {};
        checkObj["Name"] = variableObject[obj][2];
        checkObj["Visit"] = variableObject[obj][1];

        if (
          bioVariables.some(
            (bio) =>
              bio["Name"] === checkObj["Name"] &&
              bio["Visit"] === checkObj["Visit"]
          )
        ) {
          continue;
        } else {
          bioVariables.push(checkObj);

          bioQueries.push(variableObject[obj]);
          string = "bio";
        }
      } else {
        string =
          "SELECT SYS_LOC_CODE, " +
          variableObject[obj][1].toString() +
          " FROM dbo.dt_" +
          variableObject[obj][0].toString();
      }

      queries.push(string);
    }

    let totalResponses = [];
    console.log(bioQueries);
    let pool = await sql.connect(config);
    let bioString =
      "DECLARE	@return_value int EXEC	@return_value = [v54].[006_biological_report_inclusion_visitid]";
    let bioTable = await pool.request().query(bioString);
    for (let s of queries) {
      if (s == "bio") {
        allAnswers.push(bioTable);
        continue;
      }
      const res1 = await pool.request().query(s);

      totalResponses = totalResponses.concat(res1["recordset"]);

      allAnswers.push(res1);
    }

    let pushAnswers = [];
    let bioCount = 0;

    for (let ans of allAnswers) {
      let recordSet = ans["recordset"];

      recordSet.forEach((element, index, array) => {
        if (Object.keys(recordSet[0]).length == 18) {
          let setObj = {};
          let varName = bioVariables[bioCount]["Name"];
          let visitId = bioVariables[bioCount]["Visit"];

          if (element[varName] == 1 && element["visitid"] == visitId) {
            setObj["SYS_LOC_CODE"] = element["studyid"].toString();

            setObj["variableName"] = varName.toString() + visitId.toString();

            pushAnswers.push(setObj);
          }
        } else {
          let varName = Object.keys(recordSet[0])[1];

          let setObj = {};

          setObj["SYS_LOC_CODE"] = element["SYS_LOC_CODE"].toString();

          setObj["variableName"] = varName;
          if (element[varName] != null) {
            pushAnswers.push(setObj);
          }
        }
      });
      if (Object.keys(recordSet[0]).length == 18) {
        bioCount = bioCount + 1;
      }
    }
    // console.log(pushAnswers);

    const result = Array.from(
      new Set(
        pushAnswers.map((s) => {
          // console.log(s);
          return s["SYS_LOC_CODE"];
        })
      )
    ).map((lab) => {
      // console.log(lab);
      return {
        name: lab.toString(),
        sets: pushAnswers
          .filter((s) => s["SYS_LOC_CODE"] === lab)
          .map((data) => {
            // console.log(data.variableName);
            return data.variableName;
          }),
      };
    });

    const dataNeeded = result;
    // console.log(dataNeeded);

    const { sets, combinations } = extractCombinations(dataNeeded);

    let responseSend = [];
    let setArray = [];
    // for (let s of sets) {
    //   console.log(s);
    // }
    for (let c of combinations) {
      if (c["degree"] == 1) {
        combinations.splice(combinations.indexOf(c), 1);
      } else {
        setArray.push(c.sets);
      }
    }
    combinations.sort((a, b) => (a["cardinality"] < b["cardinality"] ? 1 : -1));

    responseSend.push(sets);
    responseSend.push(combinations);
    responseSend.push(setArray);

    response.send(responseSend);
  } catch (error) {
    console.error("Error in start()::", error);
  }
}
