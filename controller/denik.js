const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/denik/listAbl");
const CreateAbl = require("../abl/denik/createAbl");
const GetAbl = require("../abl/denik/getAbl");
const UpdateAbl = require("../abl/denik/updateAbl");
const DeleteAbl = require("../abl/denik/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
