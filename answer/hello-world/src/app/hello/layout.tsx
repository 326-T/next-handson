export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 space-y-10">
      <h1>This page is using a layout component</h1>
      {children}
    </div>
  );
}
