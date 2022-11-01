import { useEffect, useReducer, useState } from "react";
import Input from "./components/Input";
import Task from "./components/Task";
enum act {
  add = "Add",
  remove = "Remove",
  change = "Change",
  load = "Load",
}
interface action {
  type: act;
  payload: task;
}
export type { action };
export { act };
interface task {
  id: number;
  text: string;
  isDone: boolean;
}
const reducer = (state: Array<task>, action: action): Array<task> => {
  if (action.type === "Add") {
    let i = [...state, action.payload];
    let x = { date: new Date().toLocaleDateString(), tasks: i };
    let f = state.map((m) => {
      m.isDone = false;
      return m;
    });
    localStorage.setItem("tasks", JSON.stringify([...f, action.payload]));
    localStorage.setItem("day", JSON.stringify(x));
    return i;
  } else if (action.type === "Change") {
    let x = state.find((f) => f.id === action.payload.id);
    x!.isDone = action.payload.isDone;
    let list = [...state]
      .sort((a, b) => Number(b.isDone) - Number(a.isDone))
      .reverse();
    localStorage.setItem(
      "day",
      JSON.stringify({ date: new Date().toLocaleDateString(), tasks: list })
    );
    return list;
  } else if (action.type === "Load") {
    let i = localStorage.getItem("day");
    if (!i) return state;
    let l = JSON.parse(i!);
    let f = new Date(new Date().toLocaleDateString() + "T00:00:00Z");
    if (new Date(l.date + "T00:00:00Z") < f) {
      let x = JSON.parse(localStorage.getItem("tasks")!);
      localStorage.setItem(
        "day",
        JSON.stringify({ date: new Date().toLocaleDateString(), tasks: x })
      );
      return x!;
    }
    return l.tasks;
  } else if (action.type === "Remove") {
    let l = state.filter((f) => f.id !== action.payload.id);
    if (l.length === 0) {
      localStorage.removeItem("day");
      localStorage.removeItem("tasks");
    } else {
      let x = { date: new Date().toLocaleDateString(), tasks: l };
      localStorage.setItem("tasks", JSON.stringify(l));
      localStorage.setItem("day", JSON.stringify(x));
    }
    return l;
  }
  return state;
};
function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [shw, setShw] = useState(false);
  const handler = () => {
    setShw((p) => !p);
  };
  useEffect(() => {
    dispatch({ type: act.load, payload: { id: 1, text: "", isDone: false } });
  }, []);
  return (
    <div className=" font-sans flex-col bg-gradient-to-tl from-blue-50 to-blue-200 sm:w-screen sm:min-h-screen sm:h-full flex justify-center items-center ">
      <div className=" bg-gradient-to-tl py-5 sm:my-5 from-blue-300 to-blue-700 flex justify-start items-center flex-col sm:rounded-md w-screen sm:w-[600px] min-h-screen sm:min-h-[500px] h-auto space-y-1 sm:py-2">
        <Input dis={dispatch} />
        <div className=" sm:h-5 h-4 w-[90vw] sm:w-[540px] flex items-center justify-end">
          <button
            onClick={handler}
            className=" text-sm text-blue-50 active:text-blue-900"
          >
            {shw ? "Done" : "Edit"}
          </button>
        </div>
        {state.map((l) => (
          <Task
            show={shw}
            key={l.id}
            id={l.id}
            text={l.text}
            isDone={l.isDone}
            dis={dispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
