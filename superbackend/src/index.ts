import app from "./app";
import config from "./config";

app.listen(config.PORT as number, "0.0.0.0", () => {
  console.log(`Superbackend server running on http://localhost:${config.PORT}`);
});
