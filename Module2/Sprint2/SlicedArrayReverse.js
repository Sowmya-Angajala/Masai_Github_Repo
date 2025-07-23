function extractAndReverse(array){
    

    let slicedarray=array.slice(2,5)
    
    let p=slicedarray.length-1
    for(let k=0;k<Math.floor((slicedarray.length-1)/2);k++)
            {
              let res=slicedarray[k];
              slicedarray[k]=slicedarray[p]
              slicedarray[p]=res
              p--
            }
            
    return slicedarray
    }
    console.log(extractAndReverse([15,30,45,60,75,90]))