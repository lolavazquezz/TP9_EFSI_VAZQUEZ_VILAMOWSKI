import express from "express";
import cors from "cors";
import eventRouter from "./src/controllers/event-controller.js"; 
import eventCategoryRouter from "./src/controllers/event-category-controller.js"; 
import eventLocationRouter from "./src/controllers/event-location-controller.js"; 
import locationRouter from "./src/controllers/location-controller.js"; 
import provinceRouter from "./src/controllers/province-controller.js"; 
import userRouter from "./src/controllers/user-controller.js"; 
const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(express.json());
app.use(cors()); 

//dividir por controllers

app.use("/api/event", eventRouter);
app.use("/api/event-category", eventCategoryRouter);
app.use("/api/event-location", eventLocationRouter);
app.use("/api/location", locationRouter);
app.use("/api/province", provinceRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})