import React, { useRef } from "react";
import { action, act } from "../App";
interface pop {
  dis: React.Dispatch<action>;
}
function Input({ dis }: pop) {
  const ref = useRef<HTMLInputElement>(null);
  const handler = (p: React.SyntheticEvent) => {
    p.preventDefault();
    if (ref.current!.value.length <= 0) return;
    let i = Date.now();
    let str =
      ref.current!.value.length >= 31
        ? ref.current!.value.slice(0, 31)
        : ref.current!.value;
    dis({
      type: act.add,
      payload: { id: i, text: str, isDone: false },
    });
    ref.current!.value = "";
  };
  return (
    <form
      onSubmit={handler}
      className="flex sm:text-base text-sm space-x-2 w-[95vw] h-[35px] sm:w-[580px] sm:h-[50px] rounded bg-gradient-to-l from-blue-100 to-blue-50 text-blue-800 px-1"
    >
      <input
        type="text"
        className=" w-[88vw] h-[35px] sm:w-[510px] sm:h-[50px] caret-purple-700 h- outline-0 bg-transparent"
        ref={ref}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Input;
