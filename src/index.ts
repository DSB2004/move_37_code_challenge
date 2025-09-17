import { app } from "./app";

import { PORT } from "./config";

const serve = () => {
  app.listen(PORT);
  console.info(`Server running on ${PORT}`);
};

serve();
