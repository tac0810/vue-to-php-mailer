import "./extensions";
import es6Promise from "es6-promise";
import platform from "platform";

es6Promise.polyfill();

if (process.env.NODE_ENV === "development") {
  console.log(
    "%cTHIS SOURCE IS DEVELOPMENT MODE.",
    "color: #F8BBD0;background-color: #E91E63;border:6px solid #E91E63;"
  );
} else {
  console.log(
    "%cBUILT AT " + new Date(process.env.TIME_STAMP),
    "color: #B3E5FC;background-color: #03A9F4;border:6px solid #03A9F4;"
  );
}

if (platform.name === "IE") {
  let $html = document.querySelector("html");
  $html.classList.add("is-ie");
}

if (platform.os.toString().toLowerCase().indexOf("win") !== -1) {
  let $html = document.querySelector("html");
  $html.classList.add("is-windows");
}
