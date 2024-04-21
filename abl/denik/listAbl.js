const denikDao = require("../../dao/denik-dao.js");

async function ListAbl(req, res) {
  try {
    const denikList = denikDao.list();
    res.json(denikList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
