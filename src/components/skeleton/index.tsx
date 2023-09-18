import { cn } from "../../utils";

/**
 * @param {string} height - proper tailwind height attribute
 * @param {string} width - proper tailwind width attribute
 */
export const Skeleton = ({
  height = "100%",
  width = "100%",
  className,
}: {
  height?: string;
  width?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("background-animate max-w-full rounded", className)}
      style={{
        height,
        width,
      }}
    />
  );
};
