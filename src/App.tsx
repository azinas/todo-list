import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addList, deleteItem, editItem } from "./slice";

function App() {
  const [task, setTask] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);

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
        <div className="h-[500px] w-[500px] border-2 ">
          {list.map((item: string, index: number) => (
            <div key={index} className="flex flex-col w-full">
              <div className="flex flex-row w-full border-b-2 p-1">
                <div className="w-4/6">{item}</div>
                <Button
                  onClick={() => {
                    setEditText(item);
                    setEditIndex(index);
                  }}
                  className="text-red-600 border-8 w-1/6"
                >
                  -
                </Button>
                <Button
                  onClick={() => deleteInput(index)}
                  className="text-red-600 border-8 w-1/6"
                >
                  X
                </Button>
              </div>
              {editText && index === editIndex && editInput(item, index)}
            </div>
          ))}
        </div>
        <input
          className="border-2 w-5/6"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        ></input>
        <Button onClick={addItem} className="text-red-600 border-8  w-1/6">
          +
        </Button>
      </div>
    </div>
  );
}

export default App;
