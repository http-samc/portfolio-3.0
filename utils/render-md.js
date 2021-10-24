const marked = require("marked");
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require("path");

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function read(filepath) {
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return data
    }
    catch (err) {
        console.error(err);
    }
}

function write(filepath, contents) {
    ensureDirectoryExistence(filepath);
    try {
        fs.writeFileSync(filepath, contents);
    }
    catch(err) {
        console.error(err);
    }
}

function getAllFiles(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });
    return arrayOfFiles
}

function indexes(source, find) {
    if (!source) {
      return [];
    }
    if (!find) {
      return source.split('').map(function(_, i) { return i; });
    }
    var result = [];
    for (i = 0; i < source.length; ++i) {
      if (source.substring(i, i + find.length) == find) {
        result.push(i);
      }
    }
    return result;
}

function insertFragments(md) {
    open = indexes(md, "${");
    close = indexes(md, "}$");
    calls = []
    fragments = []
    if (open.length !== close.length)
        throw Error(`Invalid Fragment Request: ${open.length} opening sequences vs ${close.length} closing sequences.`);
    for (i = 0; i < open.length; i++) {
        fragmentPath = md.substring(open[i]+2, close[i]);
        fragment = read(fragmentPath);
        calls.push("${"+fragmentPath+"}$");
        fragments.push(fragment)
    }
    for (i = 0; i < fragments.length; i++) {
        md = md.replace(
            calls[i],
            fragments[i]
        )
    }
    return md
}

function render(root, output, template, preprocessor) {
    fsExtra.emptyDirSync(output);
    templateText = read(template);
    paths = getAllFiles(root, []);
    paths.forEach(function(path) {
      if (path.includes('.DS_St')) return
      markdown = read(path).replace('\\t', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
      markdown = preprocessor(path, markdown);
      markdown = insertFragments(markdown);
      htmlFragment = marked(markdown);
      publicPath = path.replace(root, output).slice(0, -3) + '.html';
      page = templateText.replace("${markdown}$", htmlFragment);
      // Rest of reg exp w/ fragment (get inner path, read file, replace call with read html)
      // DomPurify
      write(publicPath, page);
    });
}

exports.render = render;