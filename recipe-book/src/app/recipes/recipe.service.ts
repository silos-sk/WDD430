import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model"

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] =[
        new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.magimix.com/files/rec_82280/bouillon%20(3)_photo.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://assets.magimix.com/files/rec_82280/bouillon%20(3)_photo.jpg')
      ]
      
    getRecipes(){
        return this.recipes.slice();
    }
}