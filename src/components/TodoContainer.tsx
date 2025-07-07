interface TodoContainerProps {
  children: React.ReactNode;
}

export default function TodoContainer({ children }: TodoContainerProps) {
  return (
    <div className="flex flex-col min-w-[800px] min-h-[500px] rounded-lg shadow">
      {children}
    </div>
  );
}
