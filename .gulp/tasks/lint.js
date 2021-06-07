import BaseTask from "./base";
import gulp from "gulp";
import eslint from "gulp-eslint";
import notify from "gulp-notify";
import plumber from "gulp-plumber";

export default class LintTask extends BaseTask {
    constructor() {
        super();
    }

    task(cb) {
        gulp.src(this.src)
            .pipe(eslint())
            .pipe(plumber())
            .pipe(eslint.format())
            .on("error", notify.onError('Error!!!'))
            .pipe(eslint.failAfterError());
        cb();
    }
}