import logo from "./logo.svg";

function App() {
  return (
    <div className="App bg-gray-600">
      <div className="flex w-100 h-[100vh] justify-center items-center">
        <img src={logo} className="animate-spin w-80  h-100" alt="alt" />
      </div>
    </div>
  );
}

export default App;
