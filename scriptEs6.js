class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //create tr element
        const row = document.createElement('tr');
        //insert columns
        row.innerHTML = `
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);

    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        //alert disappear after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();

        }, 3000);


    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();                                                                                   //here target contains a tag and it is dynamically created and it is under tr->td->a tag hence we want to delete tr therefore we have to go to its parent of parent

        }

    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


//event listener for add BOOK
document.getElementById('book-form').addEventListener('submit', 
    function(e){ 
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        //instantiate book
        const book = new Book(title, author, isbn);

        //instantiate ui
        const ui = new UI();

        

        //validation
        if(title === '' || author === '' || isbn === ''){

           //error alert
           ui.showAlert('Please fill in all details', 'error');                                                                 //error is class here

        }else{

            //add book to list
             ui.addBookToList(book);

             //we want alert msg when book is successfully added
             ui.showAlert('Book is Successfully Added', 'success');

            //clear fields of book list
             ui.clearFields();
        }

       

        e.preventDefault();
    });

//event listener for delete BOOK
document.getElementById('book-list').addEventListener('click', function(e){

   //instantiate ui
   const ui = new UI();

   //delete book from the dom
   ui.deleteBook(e.target);

   //show alert msg
   ui.showAlert('Book is Successfully removed', 'success');

    e.preventDefault();
})
