const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const denikFolderPath = path.join(__dirname, "storage", "denikList");

// Method to create denik to a file
function create(event) {
  try {
    event.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(denikFolderPath, `${event.id}.json`);
    const fileData = JSON.stringify(event);
    fs.writeFileSync(filePath, fileData, "utf8");
    return event;
  } catch (error) {
    throw { code: "failedToCreateDenik", message: error.message };
  }
}

// Method to list notes in a folder
function list() {
  try {
    const files = fs.readdirSync(denikFolderPath);
    const noteList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(denikFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return noteList;
  } catch (error) {
    throw { code: "failedToListNotes", note: error.note };
  }
}

// get diary and all its entries
function getDiary(diaryId) {
  try {
    const files = fs.readdirSync(denikFolderPath);
    diary = null;
    files.forEach(file => {
      console.log(file, diaryId)
      if (file === `${diaryId}.json`) {
        console.log("truuu")
        const filePath = path.join(denikFolderPath, file);
        const fileData = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(fileData);
        diary = data
      }
    });
    if(diary) return diary
    return {"msg": "Diary does not exist"}
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Diary does not exist", note: error.note };
  }
}


function deleteDiary(diaryId) {
  try {
    console.log(diaryId, "to be deleted")
    const files = fs.readdirSync(denikFolderPath);
    fileDeleted = null;
    files.forEach(file => {
      console.log(file);
      if (file === `${diaryId}.json`) {
        console.log("yes+++")
        const filePath = path.join(denikFolderPath, file);
        fs.unlinkSync(filePath);
        fileDeleted = true
      }
    });
    if (fileDeleted) return { "msg": "Denik deleted sucesfully" }
    return { "msg": "Denik does not exist" }
  } catch (error) {
    // Catch and throw a more descriptive error if something goes wrong
    throw { code: "Denik does not exist", note: error.note };
  }
}



// Method to update diary Entry (change name)
function updateDiary(diary) {
    try {
      diaryId = diary.id;
      newName = diary.newName;
      console.log("OK")
      const files = fs.readdirSync(denikFolderPath);
      fileUpdated = null;
      files.forEach(file => {
        if (file === `${diaryId}.json`) {
          const filePath = path.join(denikFolderPath, file);
          const fileData = fs.readFileSync(filePath, 'utf8');
          let data = JSON.parse(fileData);
          data.name = newName;
          // Write the updated JSON back to the file
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          fileUpdated = true
        }
      });
      if (fileUpdated) return { "msg": "Denik updated sucesfully" }
      return { "msg": "Denik does not exist" }
    } catch (error) {
      // Catch and throw a more descriptive error if something goes wrong
      throw { code: "Denik does not exist", note: error.note };
    }
  }


  module.exports = {
    create,
    list,
    getDiary,
    deleteDiary,
    updateDiary
  };
