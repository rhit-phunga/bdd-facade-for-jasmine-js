
const { SpecReporter } = require('jasmine-spec-reporter');

jasmine.getEnv().clearReporters(); // remove default reporter
jasmine.getEnv().addReporter(new SpecReporter({
  suite: {
    displayNumber: false,
  },
  spec: {
    displayPending: false,
    // displayStacktrace: 'pretty',
  },
  summary: {
    displaySuccessful: false,
    displayFailed: true,
    displayPending: true
  }
}));

