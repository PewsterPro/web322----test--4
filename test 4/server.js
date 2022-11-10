//Student Name: Hugh Kim
//Student Number: 141050211
//Email: hkim384@myseneca.ca
//Cyclic URL: https://good-gold-jaguar-wear.cyclic.app

const express = require("express");
const dataPrep = require("./data_prep");
const exphbs = require("express-handlebars");
const HTTP_PORT = process.env.PORT || 8080;

const app = express();

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    helpers: {
        navLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
            '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
           }
    }
}));
app.set('view engine', '.hbs');

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });
   
app.get("/", (req, res) => {
    res.render('home');
});

app.get("/CPA", function(req,res){
    dataPrep.cpa()
    .then((data) => {res.render("cpa", {students: data});}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.get("/highGPA", function(req,res){
    dataPrep.highGPA()
    .then((data) => {res.render('highGPA', {high: data});}).catch((err) => {
        console.log(err);res.json(err);
    })
    
});

app.get("/addStudent", (req, res) => {
    res.render('addStudent');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/addStudent", function(req,res){
    dataPrep.addStudent(req.body).then(() => {res.redirect("/allStudents");});
});

app.get("/allStudents", function(req,res){
    dataPrep.allStudent()
    .then((data) => {res.render("students", {students: data});}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.get("/student/:studId", function (req, res) {
    dataPrep.getStudentById(req.params)
    .then((data) => {res.json(data);}).catch((err) => {
        console.log(err);res.json(err);
    })
});

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
})

dataPrep.prep()
    .then(() => {
        app.listen(8080, onHttpStart);
    }).catch((err) => {
        console.log(err);
    });