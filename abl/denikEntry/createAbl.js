const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const denikEntryDao = require("../../dao/denikEntry-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    diaryId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["title", "diaryId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    console.log(req.body)
    let entry = req.body;

    // validate input
    const valid = ajv.validate(schema, entry);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    entry = denikEntryDao.create(entry);
    res.json(entry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
