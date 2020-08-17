const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
// const Employee = require('./lib/Employee.js')
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");

let employees = []

const createManager = employee => {
    prompt ([
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is the office number?'
        }
    ])
    .then(({ officeNumber }) => {
        employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
        addMore()
    })
    .catch(err => { console.log(err)})
}

const createEngineer = employee => {
    prompt ([
        {
            type: 'input',
            name: 'github',
            message: 'Please type in your GitHub site.'
        }
    ])
    .then(({ github }) => {
        employees.push(new Engineer(employee.name, employee.id, employee.email, github))
        addMore()
    })
    .catch(err => { console.log(err)})
}

const createIntern = employee => {
    prompt ([
        {
            type: 'input',
            name: 'school',
            message: 'Please type in your school name.'
        }
    ])
    .then(({ school }) => {
        employees.push(new Intern(employee.name, employee.id, employee.email, school))
        addMore()
    })
    .catch(err => { console.log(err)})
}

const addMore = () => {
    prompt ([
        {
            type: 'list',
            name: 'choice',
            message: "Are there any more employee you would like to add?",
            choices: ['Yes, I would like to add more.', 'No, thank you.']
        }
    ])
    .then(({ choice }) => {
        switch (choice) {
            case 'Yes, I would like to add more.' :
                staff ()
                break
            case 'No, thank you.' :
                const html = render (employees)
                fs.writeFileSync(outputPath, html)
                console.log("File generated!")
                break
        }
    })
    .catch(err =>{console.log(err)})
}

const staff = () => {
    prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the role of the staff you'd like to create?",
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'email',
            message: "What's the email address of the employee?"
        },
        {
            type: 'number',
            name: 'id',
            message: "What's the id number of the employee?"
        },
    ])
    .then(employee =>{
        switch (employee.role){
            case 'Manager' :
                createManager(employee)
                break
            case 'Engineer' :
                createEngineer(employee)
                break
            case 'Intern' :
                createIntern(employee)
                break
        }
    })
    .catch(err => {console.log(err)})
}

staff()