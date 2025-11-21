import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BbService } from '../bb';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-detail',
  templateUrl: './bb-detail.html',
  styleUrl: './bb-detail.css',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class BbDetailComponent implements OnInit {
  bb$!: Observable<any>;
  comments$!: Observable<any[]>;
  author: string = '';
  password: string = '';
  content: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private bbservice: BbService, 
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const pk = this.ar.snapshot.params['pk'];
    this.bb$ = this.bbservice.getBb(pk);
    this.comments$ = this.bbservice.getComments(pk);
  }

  submitComment() {
    this.errorMessage = '';
    this.successMessage = '';

    const pk = this.ar.snapshot.params['pk'];
    this.bbservice.addComment(+pk, this.author, this.password, this.content)
      .subscribe({
        next: () => {
          this.content = '';
          this.successMessage = 'Комментарий успешно добавлен!';
          this.cdr.detectChanges();
          this.comments$ = this.bbservice.getComments(pk);
          
          setTimeout(() => {
            this.successMessage = '';
            this.cdr.detectChanges();
          }, 3000);
        },
        error: (err) => {
          console.log('Ошибка:', err);
          
          if (err.error && err.error.detail) {
            this.errorMessage = err.error.detail;
          } else if (err.status === 401 || err.status === 403) {
            this.errorMessage = 'Неверное имя пользователя или пароль';
          } else if (err.status === 400) {
            this.errorMessage = 'Проверьте правильность заполнения полей';
          } else if (err.status === 404) {
            this.errorMessage = 'Объявление не найдено';
          } else {
            this.errorMessage = 'Ошибка при добавлении комментария. Попробуйте позже';
          }
          
          this.cdr.detectChanges();
        }
      });
  }

  closeAlert() {
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();
  }
}
