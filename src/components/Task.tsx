import React, { useState } from "react";
import { act, action } from "../App";
interface pops {
  text: string;
  id: number;
  isDone: boolean;
  show: boolean;
  dis: React.Dispatch<action>;
}
function Task({ text, id, show, isDone, dis }: pops) {
  const [check, setCheck] = useState(isDone);
  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dis({
      type: act.change,
      payload: { id, text: "", isDone: e.target.checked },
    });
    setCheck(e.target.checked);
  };
  const remove = () => {
    dis({ type: act.remove, payload: { id, text: "", isDone: false } });
  };
  function txt(str: string): string {
    if (str.length < 20) return str!;
    let w = window.innerWidth;
    if (w <= 600) {
      return str.slice(0, 20) + "...";
    } else {
      return str.slice(0, 30) + "...";
    }
  }
  return (
    <div className="w-[90vw] sm:text-base text-sm sm:w-[480px] px-2 h-[40px] sm:h-[50px] bg-blue-50 rounded flex  justify-between items-center space-x-5 text-blue-800">
      <div className="flex space-x-1 justify-center items-center">
        <input
          type="checkbox"
          value=""
          onChange={handler}
          checked={check}
          className="w-4 h-4 text-blue-800 bg-blue-50 "
        />
        <p className={`${check && "line-through"} decoration-black`}>
          {txt(text)}
        </p>
      </div>
      {show && (
        <button
          onClick={remove}
          className=" w-12 h-8 text-xs active:text-black"
        >
          remove
        </button>
      )}
    </div>
  );
}

export default Task;
