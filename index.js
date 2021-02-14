const express = require("express");
const app = express();

require("./middlewares/engine.mdw")(app);
require("./middlewares/public.mdw")(app);
require("./middlewares/routes.mdw")(app);

const PORT = process.env.PORT || 1212;

app.listen(PORT, () => {
  console.log("App is start at ", PORT);
});
