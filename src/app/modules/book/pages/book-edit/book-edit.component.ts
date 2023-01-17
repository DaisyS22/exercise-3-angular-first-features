import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookForm: FormGroup;
  authorsForm: FormArray;
  // authorsForm: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  get Controls() {
    return (<FormArray>this.bookForm.get('authors')).controls;
  }

  onSubmit() {
    // const newBook = new Book(
    //   this.bookForm.value['name'],
    //   this.bookForm.value['authors'],
    //   this.bookForm.value['isbn']
    // );
    // if (this.editMode) {
    //   this.bookService.updateBook(this.id, this.bookForm.value);
    // } else {
    //   this.bookService.addBook(this.bookForm.value);
    // }
    // this.onCancel();
    console.log(this.bookForm.value);
  }

  onAddAuthor() {
    (<FormArray>this.bookForm.get('authors')).push(
      new FormGroup({
        name: new FormControl(),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let bookName = '';
    let bookAuthors = new FormArray([]);
    let bookIsbn = '';

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      bookName = book.name;
      bookIsbn = book.isbn;
      if (book['authors']) {
        for (let author of book.authors) {
          bookAuthors.push(new FormGroup({}));
        }
      }
    }

    this.bookForm = new FormGroup({
      name: new FormControl(bookName),
      authors: bookAuthors,
      isbn: new FormControl(bookIsbn),
    });
  }
}