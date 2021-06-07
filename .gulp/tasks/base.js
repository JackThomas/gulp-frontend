import minimist from "minimist";
import through2 from "through2";

export default class BaseTask {
    constructor() {
        this.handleArguements();
    }

    handleArguements() {
        const arugments = minimist(process.argv.slice(1), {
            prod: ''
        });

        this.isProduction = (arugments.prod !== undefined) ? arugments.prod : false;
        this.useBrowserSync = (arugments.sync !== undefined) ? arugments.sync : false;
    }

    setSrc(src) {
        this.src = src;
        return this;
    }

    setDest(dest) {
        this.dest = dest;
        return this;
    }

    setFilename(fileName) {
        this.fileName = fileName;
        return this;
    }

    banner() {
        const now = (new Date()).toString();
        return `/*!\n * Build date: ${now} \n */\n`;
    }

    noop() {
        // return gutil.noop();
        return through2.obj();
    }

    error(error) {
        if (error.message) {
            console.log("\n");
            console.log(error.message);
            console.log("\n");
        }
        else {
            console.log(error);
        }

        this.emit("end");
    }
}