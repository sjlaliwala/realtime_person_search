const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
require('dotenv').config();
const schema = require("./schema/schema");
const app = express();
app.use(cors());
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Realtime Search Backend hosted on Port: ${PORT}.`);
});
//# sourceMappingURL=index.js.map