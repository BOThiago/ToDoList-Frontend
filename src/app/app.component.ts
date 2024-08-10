import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreComponentsModule } from './core/core-components.module';
import { SessionService } from './core/services/session.service';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, CoreComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  constructor(
    protected themeService: ThemeService,
    private _sessionService: SessionService
  ) {}

  protected get isLogged(): boolean {
    return this._sessionService.isLogged;
  }
}
