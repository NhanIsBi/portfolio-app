const os = require('os');

// Polyfill for os.availableParallelism which is missing in Node.js 19.1.0
if (!os.availableParallelism) {
  os.availableParallelism = () => {
    try {
      return os.cpus().length;
    } catch (e) {
      return 1;
    }
  };
}

console.log('Applied polyfill for os.availableParallelism');

// Delegate to the original Angular CLI
require('./node_modules/@angular/cli/bin/ng');
