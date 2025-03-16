import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { addList, deleteItem, editItem } from "./slice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  const [task, setTask] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);
  const [checked, setChecked] = useState(false);

  const list = useSelector(
    (state: { todoList: { list: [] } }) => state.todoList.list
  );

  const dispatch = useDispatch();

  function addItem() {
    if (task.trim() !== "") {
      dispatch(addList(task));
      setTask("");
    }
  }

  function deleteInput(index: number) {
    dispatch(deleteItem(index));
  }

  function editList(text: string, index: number) {
    const trimmedText = text.trim();
    if (!trimmedText) return setEditText(""), setEditIndex(0);

    if (editIndex !== null) {
      setTask(text);
      dispatch(editItem({ text: trimmedText, index }));
      setTask("");
      setEditText("");
    }
  }
  function cancelEdit(task: string, index: number) {
    dispatch(editItem({ text: task, index }));
    setTask("");
    setEditText("");
  }

  function editInput(text: string, index: number) {
    return (
      <div className="flex flex-row w-full items-center gap-3 ">
        <div className="flex-auto gap-3">
          <input
            defaultValue={text}
            onChange={(e) => setTask(e.target.value)}
            value={task}
            type="text"
            className="peer w-full  bg-gray-100 items-center py-2 gap-3 rounded-md px-3 hover:bg-gray-100 dark:hover:bg-white/5"
          />
        </div>
        <div className="gap-1 pr-2">
          <button
            type="button"
            onClick={() => editList(task, index)}
            className="gap-2 size-[26px] rounded-md p-1 pr-1 flex-none peer-has-checked:hidden hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
          >
            <Check className="size-5" />
          </button>{" "}
          <button
            type="button"
            onClick={() => cancelEdit(text, index)}
            className="gap-2 size-[26px] rounded-md p-1 pr-1 flex-none peer-has-checked:hidden hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setTask(editText);
  }, [editText]);

  return (
    <div className="flex-grow flex flex-col max-w-md w-full bg-white border rounded-xl m-2 my-4">
      <div className="flex-grow flex flex-col scroll-auto">
        {list.length === 0 ? (
          <div className="p-8 flex-grow gap-4 justify-center items-center flex flex-col">
            <img src="/no-data.svg" className="size-48" alt="empty" />
            <span className="text-neutral-500">No data.</span>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2 p-3 px-2">
            {list.map((item: string, index: number) => (
              <div key={"item_" + index}>
                {editText && index === editIndex ? (
                  editInput(item, index)
                ) : (
                  <div className="flex flex-row  w-full items-center gap-3">
                    <label className="peer flex-auto items-center py-2 gap-3 rounded-md px-3 hover:bg-gray-100 dark:hover:bg-white/5">
                      <input
                        className="peer mx-2.5 size-3.5 align-sub appearance-none rounded-[2px] border border-gray-300 accent-[#6c63ff] checked:appearance-auto dark:border-gray-600 dark:accent-[#6c63ff]"
                        type="checkbox"
                        defaultChecked={checked}
                        id={`success-checkbox-${index}`}
                        onChange={() => setChecked((state) => !state)}
                      />
                      <span className="text-gray-700 align-middle select-none peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">
                        {item}
                      </span>
                    </label>
                    <div className="peer-has-checked:hidden flex flex-row flex-none items-center gap-1 pr-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditText(item);
                          setEditIndex(index);
                        }}
                        className="size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
                      >
                        <Pencil className="size-4" />
                      </button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete Task</DialogTitle>
                          </DialogHeader>

                          <div>Are you sure you want to delete this task?</div>
                          <DialogFooter>
                            <div className="w-64 flex flex-row">
                              <DialogTrigger>
                                <button
                                  type="button"
                                  className="flex-auto w-32 h-10 text-sm mx-2 flex-grow  border-2! border-gray-500 text-gray-500 rounded-lg ring-0! outline-none! bg-white"
                                >
                                  Cancel
                                </button>
                              </DialogTrigger>
                              <DialogTrigger>
                                <button
                                  type="submit"
                                  className="flex-auto w-32 h-10 flex-grow  border-2! text-sm border-red-500 text-red-500 rounded-lg  ring-0! outline-none! bg-white"
                                  onClick={() => deleteInput(index)}
                                  value={task}
                                >
                                  Delete
                                </button>{" "}
                              </DialogTrigger>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center border gap-2 p-2 m-2 rounded-lg overflow-hidden">
        <Input
          className="flex-grow border-none! shadow-none! ring-0! outline-none!"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write your task"
          value={task}
        />
        <div>
          <Button
            variant="outline"
            size="icon"
            className="bg-[#6c63ff]! text-white border-none!"
            onClick={addItem}
          >
            <Plus className="size-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
