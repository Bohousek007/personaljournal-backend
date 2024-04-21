const express = require("express");
const router = express.Router();

//const GetAbl = require("../abl/denik/getAbl");
const ListAbl = require("../abl/denikEntry/listAbl");
const CreateAbl = require("../abl/denikEntry/createAbl");
const DeleteAbl = require("../abl/denikEntry/deleteAbl");
const UpdateAbl = require("../abl/denikEntry/updateAbl");

//router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.post("/delete", DeleteAbl);
router.post("/update", UpdateAbl);

module.exports = router;
