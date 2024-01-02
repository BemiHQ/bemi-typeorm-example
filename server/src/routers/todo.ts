import { Router } from "express";
import { complete, remove, todo, todos } from "../controllers/todo";

export const todoRouter: Router = Router();

todoRouter.route("/todos").get(todos);
todoRouter.route("/todo").post(todo);
todoRouter.route("/todo/complete").put(complete);
todoRouter.route("/todo/:id").delete(remove);
