# BDD facade for Jasmine.js

Useful if your test framework is jasmine and you want to have cucumber-esqe syntax I guess.

## Learn the facade by writing a basic test
You can run the example code immeadiately using `npx jasmine` if you want to see it in action.

### 1. Declaring a basic Scenario
```js
const { createBDD } = require("../spec/helpers/bdd-wrapper");
const { Scenario, Parameterized_Scenario, Given, When, Then } = createBDD();
require('./definitions/sample-steps'); // path to your step definitions

describe("Basic Example", () => {
  Scenario("Admin views reports", () => {
    Given("an admin is logged in");
    When("they view reports");
    Then("they should see at least one report");
  });
});
```
`Scenario` is the jasmine `it` under the hood, while `Given`, `When`, `Then` are just *functions stubs* that you can fill with a lamda function. The template algorithm that will be executed are as follows:

1. Reset the `Scenario context`
2. Registers the `Given`, `When`, `Then` functions to be executed
3. Execute the functions if they are defined in the `step registry`, throw an error if not

### 2. Register the steps on the step-registry

The `step registry` is basically a *dictionary from string to function* so registering functions are pretty straight forward.

#### 1. Make a new step definition file and import `step-registry.js` from `spec/helpers`
```js
const { defineStep, StepType } = require('path/to/step-registry');
```
#### 2. Define the steps that you listed in your scenario
```js
defineStep(StepType.GIVEN, 'an admin is logged in', (ctx) => {
    ctx.admin = { username: "admin", role: "admin" };
});

defineStep(StepType.WHEN, 'they view reports', (ctx) => {
    ctx.reports = ["Report1", "Report2"];
});

defineStep(StepType.WHEN, 'they purge reports', (ctx) => {
    ctx.reports = [];
})

defineStep(StepType.THEN, "they should see no report", (ctx) => {
    expect(ctx.reports.length).toBe(0);
})

defineStep(StepType.THEN, "they should see at least one report", (ctx) => {
    expect(ctx.reports.length).toBeGreaterThan(0);
});
```
`StepType` is an enum, allowing you to register a function to one of the three types of steps: Given, When, and Then.

`ctx` is your context dictionary. If you need to declare a variable that is visible to any step in the scenario, you do so by adding an entry to the `ctx` (see example code above).

#### 3. Run the test
Since this is built on top of jasmine, you can use `npx jasmine` to execute the test cases. The wrapper should play well with the rest of your jasmine tests.

## Test Parameterization
The facade also provides you with the ability to parameterize your tests using `Parameterized_Scenario`. You can pass in a dictionary of your parameter like so:
```js
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
```
For each row of data, the facade will load the variables into your context for you to use. When define the steps, you can simply use `ctx.a` if you want to access the `a` variable during your test. Here is how you can define the parameterized scenario above:
```js
function isNumber(num)
{
    expect(typeof num).toBe('number');
    expect(Number.isNaN(num)).toBe(false);
}

defineStep(StepType.GIVEN, "two numbers <a> and <b>", (ctx) => {
    isNumber(ctx.a);
    isNumber(ctx.b);
});

defineStep(StepType.WHEN, "<a> is added to <b>", (ctx) => {
    ctx.Result = ctx.a + ctx.b;
});

defineStep(StepType.THEN, "The <expected> <Result> should be '<a> + <b>'", (ctx) => {
    expect(ctx.Result).toBe(ctx.expected); 
});
```
> Note that the strings acts as keys for function lookups only, `ctx` is what actually being used to access the parameterized data. It is not as featureful as Cucumber where it will actually parse the string using regex.

## Reminder
This is a very minimal facade that gives you access to `Given`, `When`, and `Then` keywords. You can expand and add more functionalities if you like. There are also limitations to this framework, one notable one is that It does not show exactly where the assertion error happened, it only shows which scenario failed. However, it can report the location if your codebase throw an error.

