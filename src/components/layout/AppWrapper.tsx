interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <div className="flex flex-col gap-8 w-screen h-screen justify-center items-center bg-neutral-100 select-none">
      {children}
    </div>
  );
}
