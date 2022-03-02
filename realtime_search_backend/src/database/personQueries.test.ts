const assert = require("chai").assert;
const personQueries = require("./personQueries");

describe('Test People And Address Table Fetching', () => {
  it('saves the content', async () => {
    const peopleList = await personQueries.getPerson();
    assert(peopleList.length == 1)
  }).timeout(20000);
});

describe('Test Search Table Fetching', () => {
  it('saves the content', async () => {
    const searchResults = await personQueries.searchPeople('Marlene Outen', '0');
    assert(searchResults['searchResults'].length == 1)

  }).timeout(20000);
});

