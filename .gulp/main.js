import BrowserSync from "./tasks/browser-sync";
import CleanTask from "./tasks/clean"
import ImagesTask from "./tasks/images"
import LintTask from "./tasks/lint"
import ScriptsTask from "./tasks/scripts"
import StylesTask from "./tasks/styles"
import StyleLintTask from "./tasks/stylelint"
import TemplatesTask from "./tasks/template"
import WatchTask from "./tasks/watch";

export default class GulpTasks {
    constructor() {
        new BrowserSync();
    }

    clean(cb) {
        new CleanTask().setSrc(['dist/**/*.html']).task(cb);
    }

    images(cb) {
        new ImagesTask().task(cb);
    }

    lint(cb) {
        new LintTask().setSrc('src/js/src/*.js').task(cb);
    }

    scripts(cb) {
        new ScriptsTask().setSrc('src/js/src/*.js').setDest('dist/js/').task(cb);
    }

    styles(cb) {
        new StylesTask().setSrc('src/scss/**/*.scss').setDest('dist/css/').task(cb);
    }

    stylelint(cb) {
        new StyleLintTask().setSrc('src/scss/**/*.scss').task(cb);
    }

    templates(cb) {
        new TemplatesTask().setSrc('src/views/pages/*.hbs').setDest('dist/').task(cb);
    }

    watch() {
        this.watchImages();
        this.watchStyles();
        this.watchScripts();
        this.watchTemplates();
    }

    async watchImages() {
        const paths = ['src/images/**'];
        const tasks = [this.images];

        await new WatchTask().setWatchPaths(paths).task(tasks);
    }

    async watchStyles() {
        const paths = ['src/scss/**/*.scss'];
        const tasks = [this.styles];

        await new WatchTask().setWatchPaths(paths).task(tasks);
    }

    async watchScripts() {
        const paths = ['src/js/**/*.js'];
        const tasks = [this.lint, this.scripts];

        await new WatchTask().setWatchPaths(paths).task(tasks);
    }

    async watchTemplates() {
        const paths = ['src/views/**/*.hbs'];
        // const tasks = [this.clean, this.templates];
        const tasks = [this.templates];

        await new WatchTask().setWatchPaths(paths).task(tasks);
    }
}