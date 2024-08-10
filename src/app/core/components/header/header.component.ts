import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/shared/models/menu.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  menu: MenuModel = {
    top: [
      { title: 'Dashboard', route: '/dashboard', icon: 'star' },
      { title: 'Usuários', route: '/users', icon: 'star' },
      { title: 'Tarefas', route: '/tasks', icon: 'star' },
    ],
  };

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let relativePath = event.urlAfterRedirects;
        this.menu.top.forEach((item) => {
          item.active = item.route.includes(relativePath);
        });
      }
    });
  }

  openRoute(route?: string) {
    if (route) {
      this.router.navigateByUrl(route);
    } else {
      console.warn('Rota não identificada');
    }
  }
}
