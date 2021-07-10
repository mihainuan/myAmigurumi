import { Component } from '@angular/core';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'myAmigurumi';
}

//RxJS Class - Basic Examples 
const source = from([1, 2, 3, 4, 5, 6]);

//Check condition in array returning only EVEN NUMBERS (filtering)
const examplePipe = source.pipe(filter( num => num%2 === 0 ));

//Checks source (array) and applies logic (+100) before returning
const examplePipeAndMap = examplePipe.pipe(map(val => val + 100));

//SUBSCRIPTION (Final Return) of the Observable/Arrat
const subscribe = examplePipeAndMap.subscribe(val => console.log("EVEN Numbers (+100) -> "+val));