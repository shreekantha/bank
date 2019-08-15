import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatSortModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank.component';


const routes: Routes = [{

  path: '',
  component: BankComponent
}];

@NgModule({
  declarations: [BankComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
    
    
  ]
})
export class BankModule { }
