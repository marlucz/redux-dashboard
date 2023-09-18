import { type ReactNode } from "react";
import { Button } from "../../../components/button";

export const TableNavButton = ({
  children,
  isActive,
  onClick,
  className,
}: {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  className: string;
}) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};
