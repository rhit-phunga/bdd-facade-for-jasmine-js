

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

// PARAMETERIZED STEPS
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