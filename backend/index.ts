import { lockUploads } from "./uploads/dummy";

import { validateENV } from "./app/utils/validate-env";
validateENV();

import { startServer } from "./app/app";
startServer();
