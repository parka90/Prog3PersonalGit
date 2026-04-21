import { Routes } from '@angular/router';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';

export const routes: Routes = [
  { path: 'one', component: ComponentOneComponent },
  { path: 'two', component: ComponentTwoComponent },
  { path: '', pathMatch: 'full', redirectTo: '/one' },
  { path: '**', redirectTo: '/one' },
];
