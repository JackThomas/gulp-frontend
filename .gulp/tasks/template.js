
import BaseTask from "./base";
import gulp from "gulp";
import hb from "gulp-hb";
import rename from "gulp-rename";
import frontMatter from "gulp-front-matter"

export default class TemplatesTask extends BaseTask {
    constructor() {
        super();
    }

    task(cb) {
        return gulp
            .src(this.src)
            .pipe(frontMatter({
                property: 'data',
                remove: true
            }))
            .pipe(hb()
                .partials(['./src/views/layouts/**/*.hbs'])
                .partials('./src/views/components/**/*.hbs')
                .helpers(require('handlebars-helpers'))
                .helpers(require('handlebars-layouts'))
            )
            .pipe(rename({ extname: ".html" }))
            .pipe(gulp.dest(this.dest))
            .on("finish", function () {
                cb();
            });
    }
}
