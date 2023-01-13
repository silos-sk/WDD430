import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] =[
  new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.magimix.com/files/rec_82280/bouillon%20(3)_photo.jpg')
]
  constructor(){

  }

  ngOnInit(){

  }
}
