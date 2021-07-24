import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidemenuComponent,
    LoaderComponent,
    HomeComponent,
    MobileHeaderComponent
  ],
  exports: [HeaderComponent, SidemenuComponent, LoaderComponent, MobileHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class CoreModule {}
