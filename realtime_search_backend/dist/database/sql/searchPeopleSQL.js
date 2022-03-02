"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_PERSON_SQL = exports.SEARCH_PEOPLE_SQL = void 0;
exports.SEARCH_PEOPLE_SQL = "SELECT * FROM search WHERE search_vectors @@ plainto_tsquery($1) and personid > $2 LIMIT 30";
exports.GET_PERSON_SQL = "SELECT p.personid, p.first_name, p.last_name, a.address_street, a.address_city, a.address_state, a.address_zip FROM public.person as p INNER JOIN public.address as a ON p.personid = a.personid LIMIT 1";
//# sourceMappingURL=searchPeopleSQL.js.map