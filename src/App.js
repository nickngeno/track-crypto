import "./App.css";
import Search from "./components/Search";
import logo from "../src/coinLogo.png";

function App() {
  return (
    <div className="app">
      <header>
        <div className="container header">
          <img src={logo} alt="logo" style={{ width: 50 }} />
          <h1>Track your favorite Crypto</h1>
        </div>
      </header>
      <Search />
    </div>
  );
}

export default App;
