
import BaseTask from "./base";
import gulp from "gulp";
import hb from "gulp-hb";
import rename from "gulp-rename";
import frontMatter from "gulp-front-matter"
import handlebarsConfig from "../utils/handlebarsConfig";

export default class TemplatesTask extends BaseTask {
    constructor() {
        super();
        this.config = {};
        this.setConfig();
    }

    setConfig() {
        this.config = Object.assign({}, {
            data: './src/views/data',
            decorators: './src/views/decorators',
            helpers: './src/views/helpers',
            layouts: './src/views/layouts',
            partials: './src/views/partials',
        }, handlebarsConfig());
    }

    task(cb) {
        return gulp
            .src(this.src)
            .pipe(frontMatter({
                property: 'data',
                remove: true
            }))
            .pipe(hb()
                .helpers(require('handlebars-helpers'))
                .helpers(require('handlebars-layouts'))
                .helpers(`${this.config.helpers}/**/*.js`)
                .data(`${this.config.data}/**/*.{json,js}`)
                .decorators(`${this.config.decorators}/**/*.js`)
                .partials(`${this.config.layouts}/**/*.{hbs,handlebars,js}`)
                .partials(`${this.config.partials}/**/*.{hbs,handlebars,js}`)
            )
            .pipe(rename({ extname: ".html" }))
            .pipe(gulp.dest(this.dest))
            .on("finish", function () {
                cb();
            });
    }
}
