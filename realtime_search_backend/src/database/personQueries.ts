const DB = require("./database");
const {SEARCH_PEOPLE_SQL, GET_PERSON_SQL} = require("./sql/searchPeopleSQL")

async function getPerson(): Promise<any>  {
  return await DB.get(GET_PERSON_SQL);
}

async function searchPeople(query: string, lastPersonId: string): Promise<any> {
  let values = joinQueriesForSearch(query)
  lastPersonId = checkLastPersonId(lastPersonId)
  values.push(lastPersonId)

  let results = await DB.get(SEARCH_PEOPLE_SQL, values)

  let hasNextPage: boolean = determineHasNextPage(results)
  let nextlastPersonId: string = getLastPersonId(results)
  let pageInfo = {'hasNextPage': hasNextPage, 'lastPersonId': nextlastPersonId}

  return {'pageInfo': pageInfo, 'searchResults': results}
}

function joinQueriesForSearch(query) {
  return [query.split(' ').join(' & ')]
}

function checkLastPersonId(lastPersonId) {
  return (lastPersonId != null) ? lastPersonId : '0'
}


function determineHasNextPage(results) {
  return results.length == 30
}

function getLastPersonId(results: []) {
  if (results.length == 0) {
    return null
  }
  let lastPersonId: number = results[results.length-1]['personid']
  return lastPersonId.toString()
}



module.exports = {
  getPerson,
  searchPeople
};
