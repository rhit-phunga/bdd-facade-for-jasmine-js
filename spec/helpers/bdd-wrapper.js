const { getStep, StepType } = require("./step-registry");

// BDD wrapper for jasmine
function createBDD() 
{
    let steps = [];
    let ctx = {};

    function reset() 
    {
        steps = [];
        ctx = {};
    }

    function importData(dict)
    {
        Object.assign(ctx, dict);
        
    }

    function dictToString(dict)
    {
        return Object.entries(dict)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }

    function Scenario(name, func)
    {
        it(name, () => {
            reset();
            func();
            steps.forEach( step => {
            try {
                const fn = getStep(step.type, step.desc);
                fn(ctx);
            } catch (err) {
                const stepInfo = `[${step.type}] "${step.desc}" failed\nMessage: ${err.message}`;
                const wrappedError = new Error(stepInfo);
                wrappedError.stack = err.stack; // preserve stack trace
                throw wrappedError; 
            }
        });
        });
    }

    function Parameterized_Scenario(name, data, func)
    {
        data.forEach(entry => {
            it (`${name} with data: {${dictToString(entry)}}`, () => {
                reset();
                importData(entry);
                func();
                steps.forEach( step => {
            try {
                const fn = getStep(step.type, step.desc);
                fn(ctx);
            } catch (err) {
                const stepInfo = `[${step.type}] "${step.desc}" failed\nMessage: ${err.message}`;
                const wrappedError = new Error(stepInfo);
                wrappedError.stack = err.stack; // preserve stack trace
                throw wrappedError; 
            }
        });
            });
        });
        
    }

    function Given(desc)
    {
        steps.push({type: StepType.GIVEN, desc});
    }

    function When(desc)
    {
        steps.push({type: StepType.WHEN, desc});
    }

    function Then(desc)
    {
        steps.push({type: StepType.THEN, desc});
        
    }

    return { Scenario, Parameterized_Scenario, Given, When, Then};
}

module.exports = {createBDD};