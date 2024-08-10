import { Injectable, afterNextRender } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme = Theme.light; // Defina o tema padrão aqui

  constructor(private localStorage: LocalStorageService) {
    afterNextRender(() => {
      // Verifique se o tema foi armazenado localmente e defina-o se estiver disponível
      const storedTheme = this.localStorage.getItem('theme');
      if (storedTheme) {
        this.currentTheme =
          (storedTheme as 'light' | 'dark') == 'dark'
            ? Theme.dark
            : Theme.light;
      } else {
        this.currentTheme = Theme.light;
        // if (
        //   window.matchMedia &&
        //   window.matchMedia('(prefers-color-scheme: dark)').matches
        // ) {
        //   this.currentTheme = Theme.dark;
        // } else {
        //   this.currentTheme = Theme.light;
        // }
      }
      this.applyTheme();
    });
  }

  public toggleTheme() {
    if (this.currentTheme === Theme.light) {
      this.currentTheme = Theme.dark;
      this.localStorage.setItem('theme', 'dark');
    } else {
      this.currentTheme = Theme.light;
      this.localStorage.setItem('theme', 'light');
    }

    this.applyTheme();
  }

  public get theme(): Theme {
    return this.currentTheme;
  }

  public get themeString(): 'light' | 'dark' {
    return this.currentTheme == Theme.dark ? 'dark' : 'light';
  }

  private applyTheme() {
    const theme = this.currentTheme;
    const root = document.getElementsByTagName('body')[0];
    if (theme === Theme.dark) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
}

enum Theme {
  light,
  dark,
}
