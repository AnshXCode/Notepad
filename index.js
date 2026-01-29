const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => { 

    fs.readdir("files", (err, files) => {
        if(err){
            console.log(err);
        } else {
            console.log(files); 
            res.render("index", {files: files});
        }
    })
});


app.get("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`files/${filename}`, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.render("file", {data: data, filename: filename});
        }
    })
});

app.get("/edit/:filename", (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`files/${filename}`, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.render("edit", {data: data, filename: filename});
        }
    })
});

app.post("/update", (req, res) => {
    const {title, updatedTitle} = req.body;
    fs.rename(`files/${title}`, `files/${updatedTitle}`, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log("File updated successfully");
            res.redirect("/");
        }
    })
})

app.post("/submit", (req, res) => {
    const {title, description} = req.body;

    fs.writeFile(`files/${title}.txt`, description, (err) => {
        if(err){
            console.log(err);
        } else {
            console.log("File created successfully");
            res.redirect("/");
        }
    });
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});