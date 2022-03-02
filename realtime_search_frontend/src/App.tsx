import React, { useEffect, useState } from 'react';
import './App.css';
import RealtimeSearchBar from './components/RealtimeSearchBar';
import { Box, Typography } from '@mui/material';
import { searchPeople } from './api/searchPeople';
import InfinitePeopleGrid from './components/InfinitePeopleGrid';


const COMPONENT_WIDTH = 3/4
const MARGIN_BETWEEN_COMPONENTS = 10

function App() {
  const [currentSearchResults, setCurrentSearchResults] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [lastPersonId, setLastPersonId] = useState(null)
  const [queryAndPage, setQueryAndPage] = useState({'query': '', 'page': 1})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const setNewQueryAndClearResults = (query: string) => {
    setCurrentSearchResults([])
    setLastPersonId(null)
    setHasNextPage(true)
    setQueryAndPage({ 'query': query, 'page': 1 })
  }

  const getSearchResults = () => {
      setLoading(true)
      setError(false)
      let { query, page } = queryAndPage
      searchPeople(query, lastPersonId)
      .then((response: any) => {
        let { searchResults, pageInfo: {hasNextPage, lastPersonId} }: any = response
        let newCurrentResults: any = new Set([...currentSearchResults, ...searchResults])
        setCurrentSearchResults((): any => [...newCurrentResults])
        setHasNextPage(hasNextPage)
        setLastPersonId(lastPersonId)
        setLoading(false)
      }).catch((e: any) => {
        console.log('Error fetching next page', e.message)
        setError(true)
      })
  }

  useEffect(() => {
    if (hasNextPage) {
      getSearchResults()
    }
  }, [queryAndPage]);


  return (
    <div className="App">

      <div className="App-header">
        <Box component='div' sx={{
          width: COMPONENT_WIDTH,
          marginTop: 4,
          height: 10
        
        }}>
          <Typography sx={{fontSize: 27, fontWeight: '500'}}>Srini Realtime Search Interview</Typography>
        </Box>
        
        <Box component='div' sx={{
          width: COMPONENT_WIDTH,
          height: 10,
          marginTop: MARGIN_BETWEEN_COMPONENTS
        
        }}>
          <RealtimeSearchBar query={queryAndPage['query']} setNewQueryAndClearResults={setNewQueryAndClearResults}/>
        </Box>

        <Box sx={{
          width: COMPONENT_WIDTH,
          marginTop: MARGIN_BETWEEN_COMPONENTS,
          marginBottom: 2
        }}>

          {currentSearchResults && currentSearchResults.length > 0 ? (
          <InfinitePeopleGrid searchResults={currentSearchResults} setQueryAndPage={setQueryAndPage} hasNextPage={hasNextPage}/>
          ) : (
            <>
              <h2 style={{color: 'white'}}>No search results...</h2>
              <h4 style={{color: 'white'}}>Tip: Scroll for Pagination</h4>
            </>
          )}
        </Box> 
          {loading && <p>Loading...</p>}
          {error && <p>Error...</p>}
      </div>
    </div>
  );
}

export default App;
