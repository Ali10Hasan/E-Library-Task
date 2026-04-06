let addBookButton = document.querySelector('.addBookButton') as HTMLButtonElement;
let BoxBook = document.querySelector('.Books') as HTMLDivElement;
class Book {
#title: string;
#author: string;
#image: string;
#category: string
#available: boolean;
    constructor( title: string, author: string, image: string, category: string,  available: boolean) {
        this.#title = title;
        this.#author = author;
        this.#image = image;
        this.#category = category;
        this.#available = available;
    }
    toString(): void {
console.log('Title ' + this.#title);
console.log('Author ' + this.#author);
console.log('Image ' + this.#image);
console.log('Category ' + this.#category);
console.log('Available ' + this.#available);
    }

    get title():string {
        return this.#title;
    }
    set title(title:string){
       this.#title=title;
    }
    get author(): string {
        return this.#author;
    }
    set author(author){
        this.#author=author;
    }
    get image(): string {
        return this.#image;
    }
    set image(image){
        this.#image=image;
    }
    get category(): string {
        return this.#category;
    }
    set category(category){
        this.#category=category;
    }
    get available(): boolean {
        return this.#available;
    }
      displayInfo():{title: string, author: string, image: string, category: string,  available: boolean ,date?: string,location?: { floor: number; room: number }}{
        let objBook={title:this.#title,author:this.#author,image:this.#image,category:this.#category,available:this.#available,}
        return objBook ;
    }
}
class Library {
    #books: Book[];
    

constructor(books: Book[]) {
    this.#books = books;
    
}
addBook(book:Book): void {
    this.#books.push(book);
}
deleteBook(title: string): Book[] {
    this.#books = this.#books.filter(book => book.title !== title);
    return this.#books;
}
handleSearch(searchTerm: string): Book[] {
let searchResults: Book[] = [];
    const tempBooks = [...this.#books];
    searchResults = tempBooks.filter((book)=>{
    return (   book.title.toLowerCase().startsWith(searchTerm.toLowerCase()) || book.author.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
 book.category.toLowerCase().startsWith(searchTerm.toLowerCase()));
})
console.log(searchResults);
return searchResults;

}

  filterByCategory(category: string) {
    return this.#books.filter((book) => book.category === category);
  }

toString():void{
this.#books.map(book => book.toString());
    }
    get books(): Book[] {
        return this.#books;
    }
}
 //Reference Class
class Reference extends Book{
    #date:string
    #location:{floor:number,room:number}
    constructor(title:string , author:string ,image:string, category:string , available:boolean,date:string,location:{floor:number,room:number})
    {
super(title , author, image, category,  available);
this.#date=date;
this.#location=location;
    }
      displayInfo():{title:string , author:string ,image:string, category:string , available:boolean,date:string,location:{floor:number,room:number}}{
        let bookObj = super.displayInfo();
return {...bookObj,date:this.#date,location:this.#location}
    }
}
 function handleCard(book:Book)
 {
       const bookInfo = book.displayInfo();
  BoxBook.innerHTML += `
    <div class="Card">
        <button class="readMore">Read More</button>        
 <div class="readMoreData">
                   <div class="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
    <p class="date">Date:
    ${bookInfo.date ? bookInfo.date : ""}
    </p>
    <p class="location">Location:
   ${bookInfo.location ? bookInfo.location.floor +" "+ bookInfo.location.room : ""}
    </p>
</div>
        <img class="image" src="${book.image}" alt="">
        <div class="details">
            <p>${book.category}</p>
            <h3>${book.title}</h3>
            <h4>${book.author}</h4>
        </div>
        <div class="available-status">
            <input type="checkbox" ${book.available ? 'checked' : ''}  > 
            <span>${book.available ? 'Available' : 'Not Available'}</span>
        
        <div class="delete">
            <i class="fa-solid fa-trash"></i> Delete Book
        </div>
        </div>
    </div>
`;
 
        

 }

let book1=new Reference("Crime and Punishment","Dostoevsky","download (1).jpg","Relatic",true,"2005",{floor:1,room:1});
let book2=new Reference("Forty Rules of love","Ald Shafq","download.jpg","passionate",true,"2003",{floor:2,room:2});
let book3=new Reference("Diwan of Mutanabbi","Suliman Aissa","download (2).jpg","Philosophical",true,"2005",{floor:3,room:3});

let library = new Library([book1,book2,book3]);
library.books.forEach((book)=>{
    handleCard(book)
})

//adding book to library and display it in the page
addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    const titleInput = document.querySelector<HTMLInputElement>('.bookTitle');
    let authorInput :HTMLInputElement = document.querySelector('.author') as HTMLInputElement ;
    let imageInput: HTMLInputElement|null = document.querySelector('.image') ;
    let categoryInput: HTMLInputElement|null = document.querySelector('.category') ;
    let availableInput: HTMLInputElement|null = document.querySelector('.available') ;

    let title=titleInput?.value || '';
    let author=authorInput?.value || '';
    let image=imageInput?.value || '';
    let category=categoryInput?.value || '';
    let available=availableInput?.checked || false;



let imageURL = ""; 

const file = imageInput?.files?.[0];

if (file ) {
    imageURL = URL.createObjectURL(file);

}
  //reference new fields
  const refDate = (document.querySelector(".refDate") as HTMLInputElement)
    .value;
  const refFloor = (document.querySelector(".refFloor") as HTMLInputElement)
    .value;
  const refRoom = (document.querySelector(".refRoom") as HTMLInputElement)
    .value;


  let newBook;
  if (refDate && refFloor && refRoom) {
    newBook = new Reference(
      title,
      author,
      imageURL,
      category,
      available,
      refDate,
      { floor: Number(refFloor), room: Number(refRoom) },
    );
  } else {
    newBook = new Book(title, author, imageURL, category, available);
  }    library.addBook(newBook);

handleCard(newBook);

    library.toString();
});

//delete book from library and remove it from the page
BoxBook.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

     if (target.closest('.delete')) {
        const card = target.closest('.Card') as HTMLDivElement;
        const title = card.querySelector('h3')?.textContent || '';

         library.deleteBook(title);

         card.remove();
    }
});

//search for book and display it in the page

document.querySelector('.searchInput')?.addEventListener('input', (event) => {
    const searchTerm = (event.target as HTMLInputElement).value;

    if(searchTerm.trim()===''){
        
        console.log(library.books);
        BoxBook.innerHTML = '';
        library.books.forEach((book) =>handleCard(book) );
    }
    else{
        const results = library.handleSearch(searchTerm);
        BoxBook.innerHTML = '';

    results.forEach((book) =>handleCard(book) );
    }
});   

//filter
document
  .querySelector("#categorySelect")
  ?.addEventListener("change", (event) => {
    const category = (event.target as HTMLSelectElement).value;

    BoxBook.innerHTML = "";

    if (category === "All") {
      const result = library.books;
      result.forEach((book) => {
        handleCard(book);
      });
    } else {
      const result = library.filterByCategory(category);
      result.forEach((book) => {
        handleCard(book);
      });
    }
  });



//read info


BoxBook.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

     if (target.closest('.readMore')) {
        const card = target.closest('.Card') as HTMLDivElement;
         card.querySelector('.readMoreData')?.classList.add("open")
    
    }
    if(target.closest('.close'))
    {
        const card = target.closest('.Card') as HTMLDivElement;
         card.querySelector('.readMoreData')?.classList.remove("open")
    }
});

//close add Book Form
const addBookForm =document.querySelector(".addBook") as HTMLDivElement;
const closeBtn = document.querySelector('.close') as HTMLDivElement;

closeBtn.addEventListener('click',()=>{
addBookForm.classList.remove('open');
})

const openAddBookForm=document.querySelector('.openAddBookForm') as HTMLDivElement;
openAddBookForm.addEventListener('click',()=>{
addBookForm.classList.add('open')
})
