export default {
  spec_dir: "tests",
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],
  helpers: [
    "../spec/support/helpers/**/*.?(m)js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
  
}
