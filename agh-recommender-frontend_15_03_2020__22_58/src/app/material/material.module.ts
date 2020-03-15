import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule ]
})
export class MaterialModule {

}
