
import BaseTask from "./base";
import del from "del";

export default class CleanTask extends BaseTask {
    constructor() {
        super();
    }

    task(cb) {
        return del(this.src);
    }
}