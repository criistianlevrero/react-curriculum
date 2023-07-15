var svgstore = require('svgstore');
var fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, "../../");
const ICONS_DIR = `${ROOT_DIR}/icons/`
const ICONS_LIBRARY_DIR = `${ROOT_DIR}/svg-library/_sprites.svg`




fs.readdir(ICONS_DIR, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    var sprites = svgstore()

    files.map(function (file) {
        console.log('adding ',file.replace('.svg', ''), `${ICONS_DIR}${file}`); 
        sprites.add(file.replace('.svg', ''), fs.readFileSync(`${ICONS_DIR}${file}`, 'utf8'))
    });

    fs.writeFileSync(ICONS_LIBRARY_DIR, sprites.toString());
});
