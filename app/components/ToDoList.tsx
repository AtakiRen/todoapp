import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";
interface TodoListProps {
  tasks: ITask[];
}
const ToDoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>STT</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
          
            <Task key={task.id} task = {task}/>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
