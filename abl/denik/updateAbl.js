const Ajv = require("ajv");
const ajv = new Ajv();

const denikDao = require("../../dao/denik-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 32, maxLength: 32 },
        newName: { type: "string", minLength: 3, maxLength: 32 },
    },
    required: ["id", "newName"],
    additionalProperties: false,
};

async function UpdateAbl(req, res) {
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
        const result = denikDao.updateDiary(reqParams)
        res.json({ "msg": result });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;
