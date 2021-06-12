import BaseTask from "./base";
import gulp from "gulp";
import changed from "gulp-changed";

export default class ImagesTask extends BaseTask {
    constructor() {
        super();
        this.setSrc("./src/images/**");
        this.setDest("./dist/images");
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