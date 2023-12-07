"use client";
import React, { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo, getAllTodos } from "@/api";
import { useRouter } from "next/navigation";
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [newTaskValue, setnewTaskValue] = useState<string>("");
  const handleSubmitNewtoDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const exsitingTodos = await getAllTodos();
    const maxId = Math.max(
      ...exsitingTodos.map((todo) => parseInt(todo.id, 10))
    );
    const newId = (maxId !== -Infinity ? maxId : 0) + 1;
    const newIdString = newId.toString();

    await addTodo({
      id: newIdString,
      text: newTaskValue,
    });
    setnewTaskValue("");
    setmodalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setmodalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task
        <AiOutlinePlus className="ml-2" size={15} />
      </button>
      <Modal modalOpen={modalOpen} setmodalOpen={setmodalOpen}>
        <form onSubmit={handleSubmitNewtoDo}>
          <input
            value={newTaskValue}
            onChange={(e) => setnewTaskValue(e.target.value)}
            type="text"
            placeholder="Type here"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn ml-2 bg-primary text-black">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
