const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const denikEntryFolderPath = path.join(__dirname, "storage", "denikEntryList");

// create new entry
function create(entry) {
  try {
    entry.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(denikEntryFolderPath, `${entry.id}.json`);
    const fileData = JSON.stringify(entry);
    fs.writeFileSync(filePath, fileData, "utf8");
    return entry;
  } catch (error) {
    throw { code: "failedToCreateDenikEntry", message: error.message };
  }
}

// list all entries
function list() {
  try {
    const files = fs.readdirSync(denikEntryFolderPath);
    const noteList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(denikEntryFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return noteList;
  } catch (error) {
    throw { code: "failedToListNotes", note: error.note };
  }
}

// delete diary entry
function deleteEntry(entryId) {
  try {
    const files = fs.readdirSync(denikEntryFolderPath);
    fileDeleted = null;
    files.forEach(file => {
      if (file === `${entryId}.json`) {
        // Compose the full path for the file to be deleted
        const filePath = path.join(denikEntryFolderPath, file);
        // Delete the file
        fs.unlinkSync(filePath);
        fileDeleted = file
      }
    });
    if(fileDeleted) return {"msg": "entry deleted sucesfully"}
    return {"msg": "entry does not exist"}
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Entry does not exist", note: error.note };
  }
}

// Delete all entries that belong to diaryId (aka delete all children)
function deleteAllEntries(diaryId) {
  try {
    const files = fs.readdirSync(denikEntryFolderPath);
    filesDeleted = null;
    files.forEach(file => {
      const filePath = path.join(denikEntryFolderPath, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      let data = JSON.parse(fileData);
      if(data.diaryId == diaryId){
        fs.unlinkSync(filePath);
        filesDeleted = true;
      }
    });
    if(filesDeleted) return {"msg": "Entries deleted sucesfully"}
    return {"msg": "Deleted nothing"}
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Entry does not exist", note: error.note };
  }
}

// Get all entries that belong to diaryId
function getAllEntries(diaryId) {
  try {
    const files = fs.readdirSync(denikEntryFolderPath);
    const entries = []
    filesDeleted = null;
    files.forEach(file => {
      const filePath = path.join(denikEntryFolderPath, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      let data = JSON.parse(fileData);
      if(data.diaryId == diaryId){
        entries.push(data)
      }
    });
    return entries
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Entry does not exist", note: error.note };
  }
}


// Method to update diary Entry (change name)
function updateEntry(entry) {
  try {
    entryId = entry.id;
    newName = entry.newName;
    console.log(entry);
    const files = fs.readdirSync(denikEntryFolderPath);
    fileUpdated = null;
    files.forEach(file => {
      console.log(file);
      if (file === `${entryId}.json`) {
        const filePath = path.join(denikEntryFolderPath, file);
        const fileData = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(fileData);
        data.title = newName;
        // Write the updated JSON back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        fileUpdated = true
      }
    });
    if(fileUpdated) return {"msg": "Entry updated sucesfully"}
    return {"msg": "Entry does not exist"}
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Entry does not exist", note: error.note };
  }
}



module.exports = {
  create,
  list,
  deleteEntry,
  updateEntry,
  deleteAllEntries,
  getAllEntries
};
