function createCar(model,make,year){
    let obj={}
    obj.make=make;
    obj.model=model;
    obj.year=year;
    obj.describeCar=function describeCar(){
        console.log(`This is a ${model} ${make} ${year}`)
    }
    return obj
}
let car1=createCar(2015,"MarutiSuziki","Nexa")
car1.describeCar()