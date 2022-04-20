
console.log("hola guachín");

const StyleDictionary = require('style-dictionary').extend({
  source: ['../design-tokens/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: '../',
      files: [{
        destination: 'main-variables.scss',
        format: 'scss/variables'
      }]
    }
    // ...
  }
});

StyleDictionary.buildAllPlatforms();

console.log("terminamo guacho");
