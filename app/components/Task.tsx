"use client";
import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, eidtTodo } from "@/api";
interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const router = useRouter();
  const handleSubmitEdittoDo: FormEventHandler<HTMLFormElement> = async (e) => {
    await eidtTodo({
      id: task.id,
      text: taskToEdit,
    });
    e.preventDefault();
    setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };
 const  hanleOnDelete = async (id: string) => {
  await deleteTodo(id);
  setOpenModalDeleted(false)
 }
  return (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.text}</td>
      <td className="flex">
        <FaEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="text-green-600 mr-3 cursor-pointer hover:text-green-300"
        />
        {/*  Start - Modal */}
        <Modal modalOpen={openModalEdit} setmodalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdittoDo}>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
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
        {/*  End - Modal */}

        <MdDeleteForever
          onClick={() => setOpenModalDeleted(true)}
          size={20}
          className="text-red-600 cursor-pointer hover:text-red-300"
        />
        {/*  Start - Modal */}
        <Modal modalOpen={openModalDeleted} setmodalOpen={setOpenModalDeleted}>
          <form className="flex flex-col items-center" >
            <h3 className="text-center my-5 text-lg ">
              Do you want to delete this TO DO !
            </h3>
            <div >
            <button
            onClick={() => hanleOnDelete(task.id)}
            type="submit" className="btn ml-2 bg-primary">
                YES
              </button>
              <button type="submit" className="btn ml-2 bg-red">
                NO
              </button>
            </div>
             
          </form>
        </Modal>
        {/*  End - Modal */}
      </td>
    </tr>
  );
};

export default Task;
