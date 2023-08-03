import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json"; // don't want to override this with npm run swagger

const router = express.Router();

router.use("/test-pets", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
