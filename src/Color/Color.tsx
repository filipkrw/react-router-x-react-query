import { useColor } from "./useColor";

export const Color: React.FC = () => {
  const color = useColor();
  return <p>My favorite color is {color.data.color}</p>;
};
