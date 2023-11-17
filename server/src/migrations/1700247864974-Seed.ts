import { MigrationInterface, QueryRunner } from "typeorm";

import { Todo } from "../entities/Todo";

export class Seed1700247864974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const todo = new Todo();
    todo.task = "Run";
    todo.isCompleted = false;
    await todo.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const todo = await Todo.findOneBy({ task: "Run" });
    if (todo) await todo.remove();
  }
}
