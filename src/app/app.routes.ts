import { Routes } from '@angular/router';
import { BbListComponent } from './bb-list/bb-list';
import { BbDetailComponent } from './bb-detail/bb-detail';

export const routes: Routes = [
  { path: ':pk', component: BbDetailComponent },
  { path: '', component: BbListComponent }
];
