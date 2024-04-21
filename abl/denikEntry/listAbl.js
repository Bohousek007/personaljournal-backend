const denikEntryDao = require("../../dao/denikEntry-dao.js");

async function ListAbl(req, res) {
  try {
    const denikList = denikEntryDao.list();
    res.json(denikList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
