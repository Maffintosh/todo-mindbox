type ButtonProps = {
  children: React.ReactNode;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, isActive, ...props }: ButtonProps) {
  return (
    <button
      className={`px-1 rounded hover:bg-neutral-200 transition cursor-pointer ${isActive && "bg-neutral-200"}`}
      {...props}
    >
      {children}
    </button>
  );
}
