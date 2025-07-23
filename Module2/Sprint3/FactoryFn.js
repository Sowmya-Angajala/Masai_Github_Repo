function  createEmployee(name,role,salary){
    let obj={}
    obj.name=name
    obj.role=role
    obj.salary=salary
    obj.introduce=function(){
        console.log(`Hello, I am ${name}, working as a ${role}`)
    }
    return obj
}
let emp=createEmployee("Sumi","Developer",45000)
emp.introduce()