import { MOCK_SUGGESTIONS } from "../../entities/SearchSuggestion/mockData";
import { SearchSuggestion } from "../../entities/SearchSuggestion/types";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  debouncedFilter: (text: string, suggestions: SearchSuggestion[]) => void,
  setValue: (value: string) => void,
  setSuggestionsOpen: (open: boolean) => void
) => {
  const value = e.target.value;
  setValue(value);

  if (value.trim().length > 0) {
    debouncedFilter(value, MOCK_SUGGESTIONS);
    setSuggestionsOpen(true);
  } else {
    setSuggestionsOpen(false);
  }
};

export const handleSuggestionClick = (
  { text }: SearchSuggestion,
  setValue: (value: string) => void,
  setSuggestionsOpen: (open: boolean) => void
) => {
  setValue(text);
  setSuggestionsOpen(false);
};
