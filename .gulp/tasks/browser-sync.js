import BaseTask from "./base";
import bs from 'browser-sync';

export default class BrowserSync extends BaseTask {
    constructor() {
        super();

        if (this.useBrowserSync) {
            this.bs = bs.create();
            this.watch();
        }
    }

    watch() {
        const bs = this.bs;
        bs.watch("dist/*.html").on("change", bs.reload);

        bs.watch("dist/css/*.css", function (event, file) {
            if (event === "change") {
                bs.reload("*.css");
            }
        });

        bs.watch("dist/js/*.js", function (event, file) {
            if (event === "change") {
                bs.reload("*.js");
            }
        });

        // Now init the Browsersync server
        bs.init({

            server: "./dist/",
            baseDir: "./dist/",
            open: false,
            online: false
        });
    }


}