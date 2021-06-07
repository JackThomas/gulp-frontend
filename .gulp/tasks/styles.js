import BaseTask from "./base";
import gulp from "gulp";
import csso from "gulp-csso";
import header from "gulp-header";
import newer from "gulp-newer";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import sass from "gulp-sass";
import glob from "gulp-sass-glob";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "autoprefixer";
import sortMediaQueries from "postcss-sort-media-queries";
import importer from "sass-module-importer"

export default class StylesTask extends BaseTask {
    constructor() {
        super();
        this.setProcessors();
    }

    task(cb) {
        gulp.src(this.src)
            .pipe(
                this.isProductions
                    ? this.noop()
                    : newer("sass")
            )
            .pipe(
                this.isProduction
                    ? this.noop()
                    : sourcemaps.init({ "loadMaps": false })
            )
            .pipe(glob())
            .pipe(sass({
                "outputStyle": "compressed",
                "sourceMaps": "none",
                "precision": 5,
                "importer": importer(),
                "includePaths": [
                    "node_modules"
                ]
            })
                .on('error', sass.logError))
            .pipe(rename({ suffix: ".min" }))
            .pipe(postcss(this.processors))
            .on("error", this.error)
            .pipe(
                this.isProduction
                    ? csso({
                        restructure: true,
                        comments: false,
                        sourceMap: false,
                        debug: false
                    })
                    : this.noop()
            )
            .pipe(header(this.banner()))
            .pipe(
                this.isProduction
                    ? this.noop()
                    : sourcemaps.write("./", { "includeContent": true })
            )
            .pipe(gulp.dest(this.dest))

        cb();
    }

    setProcessors() {
        this.processors = [
            autoprefixer(),
            sortMediaQueries({
                sort: 'mobile-first'
            }),
        ];
    }
}