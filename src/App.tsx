import { Pencil, Plus, Trash2 } from "lucide-react";
import { addList, deleteItem, editItem } from "./slice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";

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
    if (editIndex !== null && editText.trim() !== "") {
      dispatch(editItem({ text, index }));
      setTask("");
      setEditText("");
    }
  }

  function editInput(text: string, index: number) {
    return (
      <div className="flex flex-row w-full border-b-2 p-1 bg-blue-400">
        <input
          className="w-5/6"
          value={task}
          name={text}
          onChange={(e) => setTask(e.target.value)}
        />

        <Button
          onClick={() => editList(task, index)}
          className="text-red-600 border-8 w-1/6"
        >
          save
        </Button>
      </div>
    );
  }

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
              <div
                key={"item_" + index}
                className="grid grid-cols-[1fr_58px] items-center gap-3"
              >
                <label className="peer grid grid-cols-[auto_1fr] items-center py-2 gap-3 rounded-md px-3 hover:bg-gray-100 dark:hover:bg-white/5">
                  <input
                    className="peer size-3.5 appearance-none rounded-[2px] border border-gray-300 accent-[#6c63ff] checked:appearance-auto dark:border-gray-600 dark:accent-[#6c63ff]"
                    type="checkbox"
                    defaultChecked={checked}
                    id={`success-checkbox-${index}`}
                    onChange={() => setChecked((state) => !state)}
                  />
                  <span className="text-gray-700 select-none peer-checked:text-gray-400 peer-checked:line-through dark:text-gray-300">
                    {item}
                  </span>
                </label>
                <div className="peer-has-checked:hidden flex flex-row items-center gap-1 pr-2">
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
                  <button
                    type="button"
                    onClick={() => deleteInput(index)}
                    className="size-[26px] rounded-md p-1 peer-has-checked:hidden hover:bg-[#6c63ff]/10 hover:text-[#6c63ff]"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                {editText && index === editIndex && editInput(item, index)}
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
