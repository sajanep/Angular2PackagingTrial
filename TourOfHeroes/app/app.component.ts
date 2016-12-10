import { Component } from '@angular/core';


declare const module;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../app/app.component.html',
    styleUrls: ['../app/app.component.css']
})

export class AppComponent {
    title = 'Tour of Heroes';
}

