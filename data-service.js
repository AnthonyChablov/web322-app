const fs = require('fs');
let departments = [];
let employees = [];

const initalize = async () => {
    try{
        const data = await fs.promises.readFile(__dirname + '/data/employees.json', "utf-8");
        employees = JSON.parse(data);

        try{
            const data = await fs.promises.readFile(__dirname + '/data/departments.json', "utf-8");
            departments = JSON.parse(data);
        }catch{
            console.log(`${error} unable to read file`);
        }
        
    }catch(error){
        console.log(`${error} unable to read file`);
    }
}

const getAllEmployees = () =>{
    return new Promise((resolve, reject)=>{
        employees.length === 0 
            ? reject("no results returned") 
            : resolve(employees);
    })
}

const getDepartments = () =>{
    return new Promise((resolve, reject)=>{
        departments.length === 0 
            ? reject("no results returned") 
            : resolve(departments);
    })
}

const getManagers = () =>{
    return new Promise((resolve, reject)=>{
        let findManagers = employees.filter((employee)=>employee.isManager)
        !findManagers
            ? reject("no results returned") 
            : resolve(findManagers)
    })
}

const addPost = (postData)=>{
    return new Promise((resolve, reject)=>{
        postData.published = postData.published ? false : true; 
        postData.id = posts.length+1;
        posts.push(postData);
        postData
            ? reject('no results returned')
            : resolve(postData);
    })
}

module.exports = {
    initalize,
    getManagers,
    getDepartments, 
    getAllEmployees, 
    departments, 
    employees,
    addPost,

 }