function Book(title,author){
    let obj={}
    obj.title=title;
    obj.author=author;
    obj.details=function details(){
        console.log(`Title: ${this.title}, Author: ${this.author}`);
    }
    return obj
}
function createLibrary(){
    let obj1={}
    let listOfBooks=[]
    obj1.addBook=function addBook(book1){
        listOfBooks.push(book1)
    }
    obj1.removeBook=function removeBook(title){
        listOfBooks.pop(title)
    }
    obj1.listBooks=function listBooks(){
        if (listOfBooks.length === 0) {
            console.log("No books in the library.");
        } else {
            listOfBooks.forEach(book => book.details());
        }
    };

    return obj1;
    }
const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();

library.removeBook("1984");
library.listBooks();
