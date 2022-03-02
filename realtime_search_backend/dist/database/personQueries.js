var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DB = require("./database");
const { SEARCH_PEOPLE_SQL, GET_PERSON_SQL } = require("./sql/searchPeopleSQL");
function getPerson() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield DB.get(GET_PERSON_SQL);
    });
}
function searchPeople(query, lastPersonId) {
    return __awaiter(this, void 0, void 0, function* () {
        let values = joinQueriesForSearch(query);
        lastPersonId = checkLastPersonId(lastPersonId);
        values.push(lastPersonId);
        let results = yield DB.get(SEARCH_PEOPLE_SQL, values);
        let hasNextPage = determineHasNextPage(results);
        let nextlastPersonId = getLastPersonId(results);
        let pageInfo = { 'hasNextPage': hasNextPage, 'lastPersonId': nextlastPersonId };
        return { 'pageInfo': pageInfo, 'searchResults': results };
    });
}
function joinQueriesForSearch(query) {
    return [query.split(' ').join(' & ')];
}
function checkLastPersonId(lastPersonId) {
    return (lastPersonId != null) ? lastPersonId : '0';
}
function determineHasNextPage(results) {
    return results.length == 30;
}
function getLastPersonId(results) {
    if (results.length == 0) {
        return null;
    }
    let lastPersonId = results[results.length - 1]['personid'];
    return lastPersonId.toString();
}
module.exports = {
    getPerson,
    searchPeople
};
//# sourceMappingURL=personQueries.js.map