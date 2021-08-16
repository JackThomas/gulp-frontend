import BaseTask from "./base";
import gulp from "gulp";
import changed from "gulp-changed";

export default class FontssTask extends BaseTask {
    constructor() {
        super();
        this.setSrc("./src/fonts/**");
        this.setDest("./dist/fonts");
    }

    task(cb) {
        return gulp.src(this.src)
            .pipe(changed(this.dest)) // ignore unchanged files
            .pipe(gulp.dest(this.dest))
            .on("finish", function () {
                cb();
            });
    }

}