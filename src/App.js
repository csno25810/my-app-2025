import React from "react";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">カレンダーアプリ</header>
      <main className="App-main">
        <CalendarView />
      </main>
    </div>
  );
}

export default App;
