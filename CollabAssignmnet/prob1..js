function printNumberPattern(N) {
    let count = 1;
    for (let i = 0; i < N; i++) {
        let row = "";
        for (let j = 0; j < N; j++) {
            row += count + " ";
            count++;
        }
        console.log(row.trim());
    }
  }
  
  let N = 3;
  printNumberPattern(N);