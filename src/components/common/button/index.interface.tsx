interface ButtonProps {
  text: string;
  type?: "button" | "reset" | "submit";
  bgColor?: string;
  size?: string;
  btnClick?: () => void;
}
