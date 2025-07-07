type CustomInputProps = {
  ref: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TodoInput({ ref, ...props }: CustomInputProps) {
  return (
    <input
      ref={ref}
      className="w-full text-lg py-2 px-8 text-neutral-500 placeholder-neutral-300 focus:outline-0 rounded-t-lg shadow"
      placeholder="What need to be done?"
      {...props}
    />
  );
}
