import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroCardComponent,
    HeroImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class HeroesModule { }
