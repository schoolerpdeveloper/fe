import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HotToastModule } from '@ngneat/hot-toast';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DebounceDirective } from './directives/debounce.directive';
import { NgxMaskModule } from 'ngx-mask';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list'; // a plugin!
import { MatSidenavModule } from '@angular/material/sidenav';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
]);

const SHARED_MODS = [
  MatIconModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  NgxMaskModule.forRoot(),
  HotToastModule.forRoot(),
  FullCalendarModule,
];

const SHARED_DECL = [DebounceDirective];

@NgModule({
  declarations: [...SHARED_DECL, DebounceDirective],
  imports: [CommonModule, ...SHARED_MODS],
  exports: [SHARED_MODS, SHARED_DECL],
})
export class SharedModule {}
