"use strict";

import { series, parallel } from "gulp";
import GulpTasks from "./.gulp/main";

/* --------------------------------
   Set up tasks
   -------------------------------- */

const tasks = new GulpTasks();

/* --------------------------------
   Set up watch task
   Needs access to this, hence arrow function
   -------------------------------- */

const watch = () => {
   tasks.watch();
};

/* --------------------------------
   Export tasks
   -------------------------------- */

exports.lint = tasks.lint;
exports.scripts = parallel(tasks.lint, tasks.scripts);
exports.stylelint = tasks.stylelint;
exports.styles = series(tasks.stylelint, tasks.styles);
exports.watch = series(tasks.styles, tasks.scripts, tasks.templates, watch);
exports.build = series(tasks.stylelint, tasks.styles, tasks.lint, tasks.scripts);
exports.templates = tasks.templates;
exports.default = series(tasks.styles, tasks.scripts, tasks.templates, watch);
