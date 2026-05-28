import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div>
      <header>
        <h1>HMCTS Task manager</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
