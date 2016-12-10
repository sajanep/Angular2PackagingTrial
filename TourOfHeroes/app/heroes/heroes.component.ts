import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

declare const module;

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: '../../app/heroes/heroes.component.html',
    styleUrls: ['../../app/heroes/heroes.component.css'],
})

export class HeroesComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero: Hero;

    heroes: Hero[];

    constructor(private heroService: HeroService,
        private router: Router) {
    }

    onSelect(hero: Hero): void
    {
        this.selectedHero = hero;
    }

    //getHeroes(): void {
    //    this.heroes = this.heroService.getHeroes();
    //}

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                // Update local copy to reflect in UI
                this.heroes.push(hero);
                // Invalidate the selection
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}

