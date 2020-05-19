const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("D:\\Jarod\\Code\\Staticbox\\staticbox_two\\.cache\\dev-404-page.js"))),
  "component---src-pages-dashboard-js": hot(preferDefault(require("D:\\Jarod\\Code\\Staticbox\\staticbox_two\\src\\pages\\dashboard.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("D:\\Jarod\\Code\\Staticbox\\staticbox_two\\src\\pages\\index.js"))),
  "component---src-pages-login-js": hot(preferDefault(require("D:\\Jarod\\Code\\Staticbox\\staticbox_two\\src\\pages\\login.js"))),
  "component---src-pages-signup-js": hot(preferDefault(require("D:\\Jarod\\Code\\Staticbox\\staticbox_two\\src\\pages\\signup.js")))
}

