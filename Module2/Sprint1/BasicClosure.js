function outerFunction() {
    let message = "Hello from the outer function!";
  
    function innerFunction() {
      console.log(message);
    }
  
    return innerFunction;
  }

  const myClosure = outerFunction(); 
  myClosure(); 
  