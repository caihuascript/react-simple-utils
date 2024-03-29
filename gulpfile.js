const gulp = require("gulp");
const sass = require("gulp-sass");
// const babel = require("gulp-babel");
const path = require("path");
const PluginError = require("plugin-error");
const through = require("through2");
const applySourceMap = require("vinyl-sourcemaps-apply");
const replaceExt = require("replace-ext");
const babel = require("babel-core");

function replaceExtension(fp) {
  return path.extname(fp) ? replaceExt(fp, ".js") : fp;
}

const babelFn = function(opts) {
  opts = opts || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError("gulp-babel", "Streaming not supported"));
      return;
    }

    try {
      const fileOpts = Object.assign({}, opts, {
        filename: file.path,
        filenameRelative: file.relative,
        sourceMap: Boolean(file.sourceMap),
        sourceFileName: file.relative
      });

      const res = babel.transform(file.contents.toString(), fileOpts);

      if (res !== null) {
        if (file.sourceMap && res.map) {
          res.map.file = replaceExtension(res.map.file);
          applySourceMap(file, res.map);
        }

        if (!res.ignored) {
          file.contents = new Buffer(res.code); // eslint-disable-line unicorn/no-new-buffer
          file.path = replaceExtension(file.path);
        }

        file.babel = res.metadata;
      }

      this.push(file);
    } catch (err) {
      this.emit(
        "error",
        new PluginError("gulp-babel", err, {
          fileName: file.path,
          showProperties: false
        })
      );
    }

    cb();
  });
};

gulp.task("babel", () =>
  gulp
    .src("./src/**/*.js")
    .pipe(babelFn())
    .pipe(gulp.dest("./dist"))
);

gulp.task("sass", function() {
  return gulp
    .src("./src/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["sass", "babel"]);
