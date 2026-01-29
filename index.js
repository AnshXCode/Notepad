const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


// app.get('/', (req, res) => {
//     res.send('hiuuuyyuuu')
// })

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile/beta", (req, res) => {
    res.send("beta");
});

app.post("/submit", (req, res) => {
    const {title, description} = req.body;

    fs.writeFile(`files/${title}.txt`, description, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log("File created successfully");
            res.redirect("/");
        }
    });
})


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
    console.log("Server is running on port 3000");
}});