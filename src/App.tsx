import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [list, setList] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(0);

  function addList() {
    if (task.trim() !== "") {
      setList([...list, task]);
      setTask("");
    }
  }
  function deleteInput(index: number) {
    const newList = list.filter((ـ, i: number) => i !== index);
    setList(newList);
  }

  function editList(text: string, index: number) {
    if (editIndex !== null && editText.trim() !== "") {
      list[index] = text;
      setTask("");
      setEditText("");
    }
  }

  function editItem(text: string, index: number) {
    setEditText(text);
    setEditIndex(index);
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
    <>
      <div className="">
        <div>
          <div className="h-[500px] w-[500px] border-2 ">
            {list.map((item: string, index: number) => (
              <div className="flex flex-col w-full">
                {" "}
                <div className="flex flex-row w-full border-b-2 p-1">
                  <div className="w-4/6">{item}</div>
                  <Button
                    onClick={() => editItem(item, index)}
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
          <Button onClick={addList} className="text-red-600 border-8  w-1/6">
            +
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
