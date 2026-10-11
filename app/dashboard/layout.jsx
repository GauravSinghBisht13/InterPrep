import Navbar from "./components/Navbar";

export default function WorkspaceLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#07070a]">
      <Navbar />
      {children}
    </div>
  );
}
