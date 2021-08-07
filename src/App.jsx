import { useEffect, useState } from "react";
import { IconMenu2, IconHistory, IconUser, IconHome2 } from "@tabler/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HistoryPage from "./pages/HistoryPage";
import { HistoryProvider } from "./utils/HistoryProvider";
import { writeToLocalStorage, readFromLocalStorage } from "./helpers";

export default function App() {
  const [history, _setHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const localHistory = readFromLocalStorage("history");
    if (localHistory) {
      _setHistory(localHistory);
    }
    // console.log(readFromLocalStorage("history"));
  }, []);
  // useEffect(() => {
  //   console.log("writeHistory effect");
  //   if (history.length > 0) {
  //     console.log("writeHistory effect / inside if");
  //     writeToLocalStorage("history", history);
  //   }
  // }, [history]);

  function setHistory(data) {
    _setHistory(data);
    writeToLocalStorage("history", history);
  }

  return (
    <div className="wrapper w-full h-screen">
      <div className="container h-full flex flex-col justify-center mx-auto w-full p-6 sm:w-96 sm:p-0">
        <HistoryProvider value={{ history, setHistory }}>
          <Router>
            <header className="px-8 py-4 mb-2 bg-indigo-500 rounded-lg shadow-md relative">
              <Link to="/" className="font-bold text-2xl text-white">
                Mujz
              </Link>
              <span className="mx-2 font-black text-xl text-yellow-300">·</span>
              <span className="font-medium text-lg text-indigo-200">
                A simsle link shortener.
              </span>
              <IconMenu2
                onClick={() => setIsMenuOpen((prev) => !prev)}
                size={28}
                className="absolute z-20 top-1/2 -right-2 -translate-y-1/2 fill-current text-white transition hover:text-yellow-300 cursor-pointer"
              />
              {isMenuOpen ? (
                <nav className="flex gap-4 absolute bottom-full left-0 mb-2">
                  <Link
                    to="/"
                    className="text-gray-600 flex gap-2 items-center hover:text-indigo-500 cursor-pointer text-sm"
                  >
                    <IconHome2 size={18} />
                    Home
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-600 flex gap-2 items-center hover:text-indigo-500 cursor-pointer text-sm"
                  >
                    <IconUser size={18} />
                    Login
                  </Link>
                  <Link
                    to="/history"
                    className="text-gray-600 flex gap-2 items-center hover:text-indigo-500 cursor-pointer text-sm"
                  >
                    <IconHistory size={18} />
                    History
                  </Link>
                </nav>
              ) : null}
            </header>
            <main>
              <Switch>
                <Route path="/" exact>
                  <HomePage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/history">
                  <HistoryPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
              </Switch>
            </main>
          </Router>
        </HistoryProvider>
        <footer className="mt-4 text-center">
          <span className="text-gray-600">created with ❤️ by </span>
          <a
            href="https://github.com/mkal1375"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-500"
          >
            Mahdi Kalhor
          </a>
        </footer>
      </div>
    </div>
  );
}
