var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert = require("chai").assert;
const personQueries = require("./personQueries");
describe('Test People And Address Table Fetching', () => {
    it('saves the content', () => __awaiter(this, void 0, void 0, function* () {
        const peopleList = yield personQueries.getPerson();
        assert(peopleList.length == 1);
    })).timeout(20000);
});
describe('Test Search Table Fetching', () => {
    it('saves the content', () => __awaiter(this, void 0, void 0, function* () {
        const searchResults = yield personQueries.searchPeople('Marlene Outen', '0');
        assert(searchResults['searchResults'].length == 1);
    })).timeout(20000);
});
//# sourceMappingURL=personQueries.test.js.map