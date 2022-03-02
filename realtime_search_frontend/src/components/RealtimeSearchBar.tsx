import React from 'react';
import SearchBar from "material-ui-search-bar";

function RealtimeSearchBar({query, setNewQueryAndClearResults}: any) {
    return (
        <SearchBar
            value={query}
            onChange={(newQuery: string) => setNewQueryAndClearResults(newQuery)}
            onCancelSearch={() => setNewQueryAndClearResults('')}
            placeholder='Find a person...'
            
        />

    );
}

export default RealtimeSearchBar;