import { SearchSuggestion } from "../../entities/SearchSuggestion/types";

export const filterSuggestions = (
  givenText: string,
  suggestions: SearchSuggestion[]
) =>
  suggestions?.filter(({ text }) =>
    text.toLowerCase().includes(givenText.toLowerCase())
  );
