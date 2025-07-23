let allBooks=[];
let currentPage=1;
let perPage=5;

const dburl=//copy firebase link

async function fetchBooks() {
    const res=await fetch("http://fakestoreapi.com/products");
    const data=await res.json();
    allBooks=data;
    renderBooks();
    
}
function renderBooks(data = allBooks){
    let start=(currentPage-1)* perPage; //1-1=0*5=0
    let paginated=data.slice(start,perPage)//0 to 5
    console.log(paginated);
    
    document.getElementById('books').innerHTML=paginated.map(book=>{
        `div>
    <h3>${book.title}</h3>
    <p>${book.price}</p>
    <p>${book.category}</p>
    <button onclick="addToFirebase('${book.id}')">Bookmark</button>
</div>`
    }).join("")


}
function changePage(val){
   const maxPage=Math.ceil(allBooks.length/perPage);/100/5 =20
   currentPage +=val
   if(currentPage<1) currentPage-1;
   if(currentPage>maxPage) currentPage=maxPage;
   renderBooks() 
}
function sortBooks(order){
    allBooks.sort((a,b)=> order ==='asc '? a.price-b.price : b.price-a.price)
    renderBooks()
}
function filterBooks(cat){
    const filtered = cat==='all'? allBooks :allBooks.filter(ele => ele.category ===cat);
    renderBooks(filtered);
}
async function addToFirebase() {
    const book=allBooks.filter((ele)=> ele.id===id)
    await fetch(`${dburl}.json`),{
        method:"POST",
        body:JSON.stringify(book)
    }
    alert("Book Added to the firebase!")
}
async function getFromFirebase() {
    const  
    
}
