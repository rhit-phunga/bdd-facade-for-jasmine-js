const { createBDD } = require("../spec/helpers/bdd-wrapper")
const { Scenario, Parameterized_Scenario, Given, When, Then } = createBDD();
require('./definitions/sample-steps')

// These are examples of BDD tests written using the framework 

describe("Basic Example", () => {
  
  Scenario("Admin views reports", () => {
    Given("an admin is logged in");
    When("they view reports");
    Then("they should see at least one report");
  });

  Scenario("Admin purge reports", () => {
    Given("an admin is logged in");
    When("they view reports");
    When("they purge reports");
    Then("they should see no report");
  });
});

// PARAMETERIZED EXAMPLE
describe("Parameterized Example", () => {
  const data = [
    {a: 5, b: 6, expected: 11},
    {a: 5, b: 0, expected: 5},
    {a: -5, b:-10, expected: -15},
    {a: 100, b:-25, expected: 75}
  ]

  Parameterized_Scenario("Adding two integers", data, () => {
    Given("two numbers <a> and <b>");
    When("<a> is added to <b>");
    Then("The <expected> <Result> should be '<a> + <b>'");
  });
});
