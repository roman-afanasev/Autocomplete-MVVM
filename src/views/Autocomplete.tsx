import { observer } from "mobx-react";
import { autocompleteViewModel } from "../viewModels/AutocompleteViewModel";
import styles from "../styles/Autocomplete.module.css";
import { SearchSuggestion } from "../models/SearchSuggestion";

const Autocomplete = observer(() => {
  return (
    <div className={styles.autocomplete}>
      <input
        value={autocompleteViewModel.value}
        type="text"
        // @ts-ignore
        onChange={(e) => autocompleteViewModel.handleInputChange(e)}
        className={styles.input}
      />
      {autocompleteViewModel.isSuggestionsOpen && (
        <ul className={styles.suggestions}>
          {autocompleteViewModel.filteredSuggestions.length > 0 ? (
            autocompleteViewModel.filteredSuggestions.map((suggestion: SearchSuggestion) => (
              <li
                key={suggestion.id}
                className={styles.suggestionItem}
                onClick={() => autocompleteViewModel.handleSuggestionClick(suggestion)}
              >
                {suggestion.text}
              </li>
            ))
          ) : (
            <span className={styles.notFound}>No items found</span>
          )}
        </ul>
      )}
    </div>
  );
});

export default Autocomplete;
