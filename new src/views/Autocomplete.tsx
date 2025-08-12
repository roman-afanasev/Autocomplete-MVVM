import { useState } from "react";
import debounce from "../../shared/lib/debounce";
import { SearchSuggestion } from "../../entities/SearchSuggestion/types";
import { filterSuggestions } from "../../features/Search/filterSuggestions";
import {
  handleChange,
  handleSuggestionClick,
} from "../../features/Search/handleActions";
import { MOCK_SUGGESTIONS } from "../../entities/SearchSuggestion/mockData";
import styles from "./Autocomplete.module.css";

const DEBOUNCE_DELAY = 500;

const Autocomplete = () => {
  const [value, setValue] = useState<string>("");
  const [isSuggestionsOpen, setSuggestionsOpen] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<SearchSuggestion[]>(MOCK_SUGGESTIONS);

  const debouncedFilter = debounce((text: string) => {
    const filtered = filterSuggestions(text, MOCK_SUGGESTIONS);
    setFilteredSuggestions(filtered);
  }, DEBOUNCE_DELAY);

  return (
    <div className={styles.autocomplete}>
      <input
        value={value}
        type="text"
        onChange={(e) =>
          handleChange(e, debouncedFilter, setValue, setSuggestionsOpen)
        }
        className={styles.input}
      />
      {isSuggestionsOpen && (
        <ul className={styles.suggestions}>
          {filteredSuggestions?.length ? (
            filteredSuggestions.map(({ id, text }) => (
              <li
                className={styles.suggestionsListItem}
                key={id}
                onClick={() =>
                  handleSuggestionClick(
                    { id, text },
                    setValue,
                    setSuggestionsOpen
                  )
                }
              >
                {text}
              </li>
            ))
          ) : (
            <span className={styles.notFound}>No items found</span>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
