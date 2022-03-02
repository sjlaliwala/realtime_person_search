const axios = require('axios')

export async function searchPeople(newQuery: string, lastPersonId: string | null) {
    let res = await axios.post('http://localhost:9000/graphql', {
        query: 
          `query SearchPeople($query: String!, $lastPersonId: String) {
            searchPeople(query: $query, lastPersonId: $lastPersonId) {
                searchResults {
                  personid
                  first_name
                  last_name
                  address_street
                  address_city
                  address_state
                  address_zip
                }
                pageInfo {
                  lastPersonId
                  hasNextPage
                }
              }
            }`,
        variables: {
          query: newQuery,
          lastPersonId: lastPersonId
        }
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).catch((error: any) => {
          console.log(error.message)
        });
    return res['data']['data']['searchPeople'] ? res['data']['data']['searchPeople'] : []
  }