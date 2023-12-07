import { json } from "stream/consumers";
import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:8000";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
    const todos = await res.json();
    return todos;
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetch tasks");
  }
};
export const addTodo = async (todo: ITask): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const newTodo = await res.json();
    return newTodo;
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetch tasks");
  }
};

export const eidtTodo = async (todo: ITask): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const updateTodo = await res.json();
    return updateTodo;
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetch tasks");
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetch tasks");
  }
};
