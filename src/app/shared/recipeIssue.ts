import { IIssue } from './issue';
import { IRecipe } from './recipe';

export interface IRecipeIssue {
    id: string;
    issue: IIssue;
    recipe: IRecipe;
}
