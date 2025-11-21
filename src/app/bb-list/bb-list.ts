import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BbService } from '../bb';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-list',
  templateUrl: './bb-list.html',
  styleUrl: './bb-list.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class BbListComponent implements OnInit {
  bbs$!: Observable<any[]>;

  constructor(private bbservice: BbService) {}

  ngOnInit() {
    this.bbs$ = this.bbservice.getBbs();
  }
}
