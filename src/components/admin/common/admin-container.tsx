type AdminContainerProps = {
  children: React.ReactNode;
};

export function AdminContainer({ children }: AdminContainerProps) {
  return <div className="flex min-h-screen">{children}</div>;
}
