import { makeAutoObservable } from "mobx";

export interface SearchSuggestion {
  id: number;
  text: string;
}

export class SearchSuggestionModel {
  suggestions: SearchSuggestion[] = [
    { id: 1, text: "Apple" },
    { id: 2, text: "Banana" },
    { id: 3, text: "Cherry" },
    { id: 4, text: "Date" },
    { id: 5, text: "Elderberry" },
    { id: 6, text: "Fig" },
    { id: 7, text: "Grape" },
    { id: 8, text: "Honeydew" },
    { id: 9, text: "Kiwi" },
    { id: 10, text: "Lemon" },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export const searchSuggestionModel = new SearchSuggestionModel();
