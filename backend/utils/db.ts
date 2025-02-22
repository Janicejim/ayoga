import Knex, { Knex as KnexType } from "knex";

const knexConfig = require("../knexfile");
const knex: KnexType = Knex(knexConfig[process.env.NODE_ENV || "development"]);
export default knex;
