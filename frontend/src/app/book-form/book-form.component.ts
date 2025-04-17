import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    if (this.bookId) {
      this.isEditMode = true;
      this.bookService.getBooks().subscribe((books) => {
        const book = books.find((b) => b.id === +this.bookId!);
        if (book) {
          this.bookForm.patchValue(book);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const book: Book = this.bookForm.value;
    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId!, book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}