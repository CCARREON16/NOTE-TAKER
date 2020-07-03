const express = require("express");
const path = require("path");
const fs = require("fs");
// express start up  
const app = express();
const PORT = process.env.PORT || 7500;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, "public"));
// HTML GET Routes
app.get("/notes",function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("*",function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// getting posts
app.post("/api/notes", function(req, res) {
    let SavedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (SavedNotes.length).toString();
    newNote.id = uniqueID;
    SavedNotes.push(newNote);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(SavedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(SavedNotes);
  })
  app.post("/api/notes", function(req, res) {
    let SavedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (SavedNotes.length).toString();
    newNote.id = uniqueID;
    SavedNotes.push(newNote);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(SavedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(SavedNotes);
  })
  app.delete("/api/notes/:id", function(req, res) {
    let SavedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = SavedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of SavedNotes) {
        currNote.id = newID.toString();
        newID++;
    }
  
    fs.writeFileSync("./db/db.json", JSON.stringify(SavedNotes));
    res.json(SavedNotes);
  })
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });