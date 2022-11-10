const fs = require("fs");
let students = [];

module.exports = {
    prep,
    cpa,
    highGPA,
    allStudent,
    addStudent,
    getStudentById
}

function prep() {
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json',(err,data)=>{
            if (err) {
                reject("unable to read file");
            }
            else {
                students = JSON.parse(data);
                resolve();
                 }
    });
});
}

function cpa() {
    return new Promise((resolve, reject) => {
        let cpaStudent = students.filter(student => student.program == "CPA")
        if (cpaStudent.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(cpaStudent);
        }
    });
}

function highGPA() {
    return new Promise((resolve, reject) => {
        let highest = students.filter(student => student.gpa == 4)
        if (highest.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(highest);
        }
    });
}

function allStudent() {
    return new Promise((resolve, reject) => {
    let allStudent = students
    if (allStudent.length == 0) {
        reject("no results returned");
        }
    else {
        resolve(allStudent);
        }
    });
}

function addStudent(studentData) {
    return new Promise((resolve, reject) => {
    students.push(studentData);
    resolve();
})
}

function getStudentById(ById) {
    return new Promise((resolve, reject) => {
        let studById = students.filter(student => student.studId == ById.studId)
        if (studById.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(studById);
        }
    });
}
