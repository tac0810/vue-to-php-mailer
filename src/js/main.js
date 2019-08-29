import "./_header";
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /^(?!_).*\.js$/);
application.load(definitionsFromContext(context));
