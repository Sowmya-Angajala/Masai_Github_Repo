function personInfo(name,age)
{
    console.log({name :this.name,age:this.age})
}
let obj={ name:"Sumii",
          age:22}
          
personInfo.call(obj)