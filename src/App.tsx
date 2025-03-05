import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addList, deleteItem, editItem } from "./slice";
import { Plus, Pencil, Trash2 } from "lucide-react";

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
    <div className="">
      <div>
        <div className="h-[60vh] w-[40vw] py-2 border-2 border-gray-50 rounded-xl shadow-xl shadow-gray-200 mx-auto ">
          <div className="h-5/6 scroll-auto">
            {list.map((item: string, index: number) => (
              <div key={index} className=" flex flex-col w-full ">
                <div className="flex flex-row w-[95%] border-2  border-gray-50  p-2 mx-3  my-1 shadow-md rounded-full">
                  <div  className="m-auto">
                    <div className="flex items-center m-auto rounded-full dark:border-gray-700">
                      <input
                        defaultChecked={checked}
                        id={`success-checkbox-${index}`}
                        type="checkbox"
                        onChange={() => setChecked((state) => !state)}
                        className="bg-[#16516d]! text-white  rounded-full! border-8"
                      />
                    </div>
                  </div>
                  <div className=" w-4/6 h-[40px] text-center text-left align-text-bottom">{item} </div>
                  <Button
                    onClick={() => {
                      setEditText(item);
                      setEditIndex(index);
                    }}
                    className="bg-[#16516d]! text-white  rounded-full! border-8 w-[40px] h-[40px]"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    onClick={() => deleteInput(index)}
                    className="bg-[#16516d]! text-white ml-1 rounded-full! border-8 w-[40px] h-[40px]"
                  >
                    <Trash2 />
                  </Button>
                </div>
                {editText && index === editIndex && editInput(item, index)}
              </div>
            ))}
          </div>
          <div className="flex flex-row h-1/5 border-2 h-[60px] border-gray-50  p-2 mx-3  my-1 shadow-md rounded-full">
            <input
              className=" w-[95%] border-none! !outline-none "
              onChange={(e) => setTask(e.target.value)}
              value={task}
            ></input>
            <div>
              <Button
                variant="outline"
                size="icon"
                className="bg-[#16516d]! text-white  rounded-full! border-8 w-[40px] h-[40px]"
                onClick={addItem}
              >
                <Plus className=" text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
