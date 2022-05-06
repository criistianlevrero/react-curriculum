var watch = require('node-watch');
const path = require('path');
const ROOT_DIR = path.join(__dirname, "../");

watch(`${ROOT_DIR}/design-tokens/`, { recursive: true }, function(evt, name) {
  require('child_process').fork(`${ROOT_DIR}/scripts/foundations-build.js`);
  console.log('%s changed.', name);
});

require('child_process').fork(`${ROOT_DIR}/scripts/foundations-build.js`);
