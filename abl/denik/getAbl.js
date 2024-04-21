const Ajv = require("ajv");
const ajv = new Ajv();

const denikDao = require("../../dao/denik-dao.js");
const denikEntryDao = require("../../dao/denikEntry-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    console.log("GET ROUTE")
    result = denikDao.getDiary(reqParams.id)
    result.children = denikEntryDao.getAllEntries(reqParams.id)

    res.json(result)

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
