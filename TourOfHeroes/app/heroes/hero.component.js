"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var hero_service_1 = require('../hero.service');
var HeroesComponent = (function () {
    function HeroesComponent(heroService) {
        this.heroService = heroService;
        this.title = 'Tour of Heroes';
    }
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    //getHeroes(): void {
    //    this.heroes = this.heroService.getHeroes();
    //}
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        //this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        this.heroService.getHeroesSlowly().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            //    template:`
            // <h1> {{ title }} </h1>
            // <h2>My Heroes</h2>
            // <ul class="heroes">
            //    <li *ngFor="let hero of heroes" >
            //        <!-- each hero goes here -->
            //        <span class="badge">{{hero.id}}</span> {{hero.name}}
            //    </li>
            // </ul>
            // <h2> {{ hero.name }} details! </h2>
            // <div> <label>id: </label>{{hero.id}}</div>
            // <div>
            //    <label>name: </label>
            //    <input [(ngModel)]="hero.name" placeholder="name">
            // </div>
            // `,
            templateUrl: 'hero.component.html',
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=hero.component.js.map