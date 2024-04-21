const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const denikDao = require("../../dao/denik-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    console.log(req.body)
    let event = req.body;

    // validate input
    const valid = ajv.validate(schema, event);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    event = denikDao.create(event);
    res.json(event);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
