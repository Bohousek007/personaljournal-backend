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

async function DeleteAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    result = denikDao.deleteDiary(reqParams.id)
    entryResult = denikEntryDao.deleteAllEntries(reqParams.id)
    console.log(result, entryResult)
    res.json({"msg":"ok"})

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
