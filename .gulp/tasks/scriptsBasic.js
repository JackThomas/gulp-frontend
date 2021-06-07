import BaseTask from "./base";
import gulp from "gulp";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

export default class ScriptsBasicTask extends BaseTask {
    constructor() {
        super();
    }

    task(cb) {
        gulp.src(this.src)
            .pipe(concat(this.fileName))
            .pipe(uglify())
            .pipe(gulp.dest(this.dest))
            .on("finish", function () {
                cb();
            });
    }
}