import BaseTask from "./base";
import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import babelify from "babelify";
import browserify from "browserify";
import through2 from "through2";
import stream from "vinyl-source-stream";
import buffer from "vinyl-buffer";

export default class ScriptsTask extends BaseTask {
    constructor() {
        super();
        this.setFilename("app.min.js");
    }

    task(cb) {
        const self = this;

        let transform = browserify({
            "debug": (self.isProduction) ? false : true,
            "paths": [
                "./public/theme/js/src"
            ],
        }).transform(babelify, {
            "sourceMaps": (self.isProduction) ? false : true,
            "presets": [
                ["@babel/env"]
            ]
        });

        gulp.src(this.src)
            .pipe(plumber())
            .pipe(

                through2.obj(
                    function write(file, enc, next) {
                        transform.add(file.path);
                        next();
                    },
                    function end(next) {
                        transform.bundle()
                            .pipe(stream(self.fileName))
                            .pipe(buffer())
                            .pipe(
                                self.isProduction
                                    ? self.noop()
                                    : sourcemaps.init({ loadMaps: true })
                            )
                            .pipe(
                                self.isProduction
                                    ? uglify()
                                    : self.noop()
                            )
                            .pipe(
                                self.isProduction
                                    ? self.noop()
                                    : sourcemaps.mapSources(function (sourcePath) {
                                        return sourcePath;
                                    }))
                            .pipe(
                                self.isProduction
                                    ? self.noop()
                                    : sourcemaps.write("./")
                            )
                            .pipe(gulp.dest(self.dest))
                            .on("finish", function () {
                                cb();
                            });

                        next();
                    }
                )
            );

    }

}