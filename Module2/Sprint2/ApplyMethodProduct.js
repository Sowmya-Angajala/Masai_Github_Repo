function multiplyNumbers(num1,num2)
{
  console.log(this.num1*this.num2)  
}

let product={
    num1:2,
    num2:9
}
multiplyNumbers.apply(product,[])