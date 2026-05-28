import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="min-h-svh bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">HMCTS Task manager</h1>
        </div>
      </header>

      <main className="mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
