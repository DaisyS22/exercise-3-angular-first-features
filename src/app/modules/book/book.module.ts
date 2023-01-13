import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookListComponent,
    BookItemComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class BookModule { }
