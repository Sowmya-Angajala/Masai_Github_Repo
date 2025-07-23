function mergeObj(profile,updates)
{
    merge={...profile,...updates,address :{ city:profile.address.city,zipcode : updates.address.zipcode,country:updates.address.country}}
    console.log(merge)
    
}
const profile = { name: "Charlie", age: 29, address: { city: "San Francisco", zipcode: "94101" } };
const updates = { age: 30, address: { zipcode: "94109", country: "USA" } };
mergeObj(profile,updates)