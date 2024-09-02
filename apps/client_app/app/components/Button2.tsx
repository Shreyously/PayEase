import { MouseEventHandler } from "react";

interface ButtonAnotherType {
  name: string;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export function Button2({ name, className, onClick }: ButtonAnotherType) {
  return (
    <div>
      <button onClick={onClick} className={`${className}`}>
        {name}
      </button>
    </div>
  );
}
