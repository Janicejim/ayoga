import Knex from "knex";

const knexConfig = require("../knexfile");
const knex: any = Knex(knexConfig[process.env.NODE_ENV || "development"]);
export default knex;
