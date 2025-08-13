import {SearchSuggestion, searchSuggestionModel} from "../models/SearchSuggestion";
import {makeAutoObservable, runInAction} from "mobx";
import debounce from "../utils/debounce";
import {ChangeEvent} from "react";

export class AutocompleteViewModel {
  value: string = "";
  isSuggestionsOpen: boolean = false;
  filteredSuggestions: SearchSuggestion[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initDebouncedFilter();
  }

  private initDebouncedFilter() {
    const debouncedFilter = debounce((text: string) => {
      runInAction(() => {
        this.filteredSuggestions = searchSuggestionModel.suggestions.filter((suggestion) =>
          suggestion.text.toLowerCase().includes(text.toLowerCase())
        );
      });
    }, 500);
    // @ts-ignore
    this.handleInputChange = this.handleInputChange.bind(this, debouncedFilter);
  }

  setValue(value: string) {
    this.value = value;
  }

  setIsSuggestionsOpen(isOpen: boolean) {
    this.isSuggestionsOpen = isOpen;
  }

  handleInputChange = (debouncedFilter: (text: string) => void, event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    this.setValue(newValue);
    if (newValue.trim().length > 0) {
      debouncedFilter(newValue);
      this.setIsSuggestionsOpen(true);
    } else {
      this.setIsSuggestionsOpen(false);
    }
  };

  handleSuggestionClick(suggestion: SearchSuggestion) {
    this.setValue(suggestion.text);
    this.setIsSuggestionsOpen(false);
  }
}

export const autocompleteViewModel = new AutocompleteViewModel();
