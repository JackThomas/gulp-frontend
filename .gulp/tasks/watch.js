import BaseTask from "./base";
import gulp from "gulp";

export default class WatchTask extends BaseTask {
    constructor() {
        super();
    }

    setWatchPaths(paths) {
        this.paths = paths;
        return this;
    }

    task(tasks) {
        gulp.watch(this.paths, gulp.series(...tasks));
    }
}