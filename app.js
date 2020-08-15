const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");

let employee = []

const createManager = employee => {
    prompt ([
        {
            type: 'number',
            name: 'officeNumber',
            message: 'What is the office number?'
        }
    ])
    .then(({ officeNumber }) => {
        employee.push(new Manager(name, role, email, id, officeNumber))
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
        employee.push(new Engineer(name, role, email, id, github))
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
        employee.push(new Intern(name, role, email, id, school))
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
                const html = render (employee)
                fs.writeFileSync(outputPath, html)
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
    .then(res =>{
        switch (res.role){
            case 'Manager' :
                createManager()
                break
            case 'Engineer' :
                createEngineer()
                break
            case 'Intern' :
                createIntern()
                break
        }
    })
    .catch(err => {console.log(err)})
}