let num = 971;
let res = 0;

while (num > 0) {
    let rem = num % 10; 
    res = (res * 10) + rem;
    num = Math.floor(num / 10);
}

console.log(res); // Output: 179
