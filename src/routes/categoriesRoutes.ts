import express, { Router } from "express";
import categoryControllers from "../controllers/categoryControllers";
export const categoriesRouter: Router = express.Router();

categoriesRouter.get("/", categoryControllers.showAllCategories);
categoriesRouter.post("/", categoryControllers.createNewCategory);
categoriesRouter.delete("/:categoryID", categoryControllers.deleteCategory);
