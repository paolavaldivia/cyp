import backMain from "../images/back-photo.png";

import { ReactNode } from "react";
import { clsx } from "clsx";

type Orientation = "left" | "right";

interface CardRoundProps {
  children: ReactNode;
  orientation: Orientation;
  className: string;
}

export function CardRound({
  children,
  orientation,
  className,
}: CardRoundProps) {
  return (
    <div className={clsx("round", orientation, className)}>
      <img className="round-back" src={backMain} alt="" />
      <div className="content">{children}</div>
    </div>
  );
}
