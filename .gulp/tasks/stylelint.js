import BaseTask from "./base";
import gulp from "gulp";
import gulpStylelint from "gulp-stylelint";

export default class StyleLintTask extends BaseTask {
    constructor() {
        super();
    }

    task(cb) {
        gulp.src(this.src)
            .pipe(gulpStylelint({
                failAfterError: false,
                reporters: [
                    { formatter: 'string', console: true }
                ]
            }).on("error", this.error).on("finish", () => {
                cb();
            }));
    }
}