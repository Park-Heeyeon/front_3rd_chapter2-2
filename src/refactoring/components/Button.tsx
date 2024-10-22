interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}
const Button = ({ label, className = "", onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
