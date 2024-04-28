import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.setDynamicTitle();
  }

  setDynamicTitle() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const titles: string[] = []; // Explicitly define the type as an array of strings
        let active = this.activatedRoute.firstChild;
        while (active) {
          if (active.snapshot.data['title']) {
            const title =
              active.snapshot.data['title'] === ':username'
                ? active.snapshot.paramMap.get('username')
                : active.snapshot.data['title'];

            if (!titles.includes(title)) {
              titles.push(title);
            }
          }
          active = active.firstChild;
        }

        const title = titles.join(' ');
        this.titleService.setTitle(title ? `BEME | ${title}` : 'BEME');
      });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(`${newTitle}'s Channel`);
  }
}
