"use client";

import { useMemo, useState } from "react";
import CircleButton from "./components/button";

type Operator = "+" | "-" | "x" | "/" | "=";

export default function Calculator() {
  const [buffer, setBuffer] = useState<string>("");
  const [formula, setFormula] = useState<(number | Operator)[]>([]);
  const operand = useMemo(() => parseFloat(buffer) || undefined, [buffer]);
  const calculated = useMemo(() => {
    if (!formula.length) return 0;
    const copied = [...formula];
    while (copied.length > 3) {
      const [num1, operator, num2] = copied.splice(0, 3);
      if (typeof num1 !== "number" || typeof num2 !== "number") break;
      if (operator === "+") copied.unshift(num1 + num2);
      else if (operator === "-") copied.unshift(num1 - num2);
      else if (operator === "x") copied.unshift(num1 * num2);
      else if (operator === "/") copied.unshift(num1 / num2);
    }
    return copied[0];
  }, [formula]);

  const onNumberClick = (value: string) => {
    setBuffer((prev) =>
      value === "." && prev.includes(".") ? prev : prev + value
    );
  };

  const onOperatorClick = (value: Operator) => {
    if (operand)
      setFormula((prev) => {
        if (prev.length > 1 && prev[prev.length - 1] === "=")
          return [operand, value];
        return [...prev, operand, value];
      });
    else {
      setFormula((prev) => {
        if (!prev.length) return prev;
        if (value === "=" && prev.length > 3)
          return [
            ...prev.slice(0, -1),
            prev[prev.length - 3],
            prev[prev.length - 2],
            "=",
          ];
        return prev.slice(0, -1).concat(value);
      });
    }
    setBuffer("");
  };

  const onClearClick = () => {
    setBuffer("");
    setFormula([]);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="block p-10 space-y-10 text-3xl text-gray-700 font-bold">
          <h1 className="text-center">電卓</h1>
          <h3 className="text-center">{operand ? operand : calculated}</h3>
          <div className="grid grid-cols-4 gap-5">
            <CircleButton value={7} onClick={() => onNumberClick("7")} />
            <CircleButton value={8} onClick={() => onNumberClick("8")} />
            <CircleButton value={9} onClick={() => onNumberClick("9")} />
            <CircleButton value="/" onClick={() => onOperatorClick("/")} />
            <CircleButton value={4} onClick={() => onNumberClick("4")} />
            <CircleButton value={5} onClick={() => onNumberClick("5")} />
            <CircleButton value={6} onClick={() => onNumberClick("6")} />
            <CircleButton value="x" onClick={() => onOperatorClick("x")} />
            <CircleButton value={1} onClick={() => onNumberClick("1")} />
            <CircleButton value={2} onClick={() => onNumberClick("2")} />
            <CircleButton value={3} onClick={() => onNumberClick("3")} />
            <CircleButton value="-" onClick={() => onOperatorClick("-")} />
            <CircleButton value={0} onClick={() => onNumberClick("0")} />
            <CircleButton value="." onClick={() => onNumberClick(".")} />
            <CircleButton value="=" onClick={() => onOperatorClick("=")} />
            <CircleButton value="+" onClick={() => onOperatorClick("+")} />
            <CircleButton value="C" onClick={onClearClick} />
          </div>
        </div>
      </div>
      <p className="text-center text-xl text-gray-700">{formula.join(" ")}</p>
    </>
  );
}
