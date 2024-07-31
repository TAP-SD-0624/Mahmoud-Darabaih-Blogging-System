import { Request, Response } from "express";
import { Category } from "../models";
import { handleError, badRequestError } from "../utils/errorHandler";

const showAllCategories = async (req: Request, res: Response) => {
  try {
    const data = await Category.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json({ status: "success", data });
  } catch (err) {
    handleError(res, err, "fail while showing all categories");
  }
};
const createNewCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return badRequestError(res, "Please provide a name for the category!!");
    }
    const [category, created] = await Category.findOrCreate({
      where: { name: categoryName },
      defaults: { categoryName },
    });
    if (created) {
      res.status(200).json({
        status: "the new category was created successfully",
        category,
      });
    } else {
      res.status(200).json({
        status: "the category already exists, no need to re create it again",
        category,
      });
    }
  } catch (err) {
    handleError(res, err, "fail fail to create new category");
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  const categoryID = req.params.categoryID;
  try {
    if (!categoryID) {
      return badRequestError(
        res,
        "Please provide the id for the category you want to delete"
      );
    }
    const deleted = await Category.destroy({ where: { id: categoryID } });
    if (deleted) {
      res.status(200).json({
        message: `the category with the ID: ${categoryID} was deleted successfully`,
      });
    }
  } catch (error) {
    handleError(res, error, `fail delete the category with ID: ${categoryID}`);
  }
};
export default {
  showAllCategories,
  createNewCategory,
  deleteCategory,
};
