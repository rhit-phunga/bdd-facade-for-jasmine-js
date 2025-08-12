
const StepType = Object.freeze({
    GIVEN: 'Given',
    WHEN: 'When',
    THEN: 'Then'
});

const stepRegistry = {};

function defineStep(type, pattern, func)
{
    const key = `${type}:${pattern}`;
    stepRegistry[key] = func;
}

function getStep(type, pattern)
{
    const key = `${type}:${pattern}`;
    const func = stepRegistry[key];
    if (!func) throw new Error(`Step not defined: [${type}] ${pattern}`);
    return func;
}

module.exports = {defineStep, getStep, StepType};