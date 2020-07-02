const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 1616;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes",function(req, res) {
    res.sendFile(path.join(main, "notes.html"));
});
app.get("*",function(req, res) {
    res.sendFile(path.join(main, "index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/api/notes/:id", function(req, res) {
    let SavedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(SavedNotes);
});    
app.post("/api/notes", function(req, res) {
    let SavedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let  newID = (SavedNotes.length).toString();
    newNote.id = newID;
    SavedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(SavedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(SavedNotes);
})
    app.delete("./api/notes/id")
