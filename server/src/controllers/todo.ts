import { Request, Response } from "express";
import { Todo } from "../entities/Todo";

export const todos = async (req: Request, res: Response): Promise<void> => {
  const data: Todo[] = await Todo.find();
  res.status(200).json(data);
};

export const todo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  const todo = new Todo();
  todo.task = task;
  todo.isCompleted = false;

  await todo.save();

  res.status(201).json({ message: "Todo added", todo });
};

export const complete = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.body?.id);
  const todo = await Todo.findOneBy({ id });
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.status(200).json({ message: `Todo changed to ${todo.isCompleted}` });
  } else {
    res.status(404).json({ message: "No Todo found" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params?.id);
  try {
    const todo = await Todo.findOneBy({ id });
    await todo?.remove();
    res.status(204).json({ message: "Todo successfully deleted" });
  } catch (error) {
    res.status(404).json({ error });
  }
};
