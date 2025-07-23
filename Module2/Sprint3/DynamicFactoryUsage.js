function createInventoryItem(name,category,price){
    let obj={}
    obj.name=name;
    obj.category=category;
    obj.price=price;
    obj.describeItem=function(){
        console.log(`Item: ${name},Category: ${category},price:${price}`)
    }
     
    return obj;
     }
function addItemDiscount(inventoryItem,discountPercent){
     let discountPrice=(discountPercent/100) *  inventoryItem.price
    let obj1={}
    obj1.inventoryItem=inventoryItem
    obj1.discountPercent=discountPercent
    obj1.applyDiscount=function applyDiscount (inventoryItem,discountPercent){
        
         console.log(`Discounted price for ${this.inventoryItem.name}:${discountPrice}`)
    }
     return obj1
}
let item=createInventoryItem("Laptop","Electronics",1500);
item.describeItem();
let discountedItem=addItemDiscount(item,10)
discountedItem.applyDiscount()