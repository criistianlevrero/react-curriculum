const path = require('path');
const ROOT_DIR = path.join(__dirname, "../../");
const StyleDictionary = require('style-dictionary')
const deepMerge = require("deepmerge");

const webConfig = require('./transformers/web/index')


StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  }
})

StyleDictionary.registerFilter({
  name: 'validToken',
  matcher: function(token) {
    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
    ].includes(token.type);
  }
})



const StyleDictionaryExtended = StyleDictionary.extend({
  ...deepMerge.all([webConfig]),
  source: [`${ROOT_DIR}/design-tokens/*.json`],
  platforms: {
    scss: {
      transformGroup: "custom/css",
      buildPath: `${ROOT_DIR}/scss/variables/`,
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          filter: "validToken",
        },
      ],
    },
  },
});
console.log('StyleDictionaryExtended', StyleDictionaryExtended)


StyleDictionaryExtended.buildAllPlatforms()
