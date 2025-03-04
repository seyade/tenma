import app from "./express/app.express";
import { config } from "./config";

app.listen(config.PORT, "0.0.0.0", () => {
  console.log(`Backend served on ${config.PORT}`);
});
