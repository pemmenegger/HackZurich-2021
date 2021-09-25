import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Questions from "./pages/Questions";
import Article from "./pages/Article";

function App() {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => {
          return (
            <Switch location={location}>
              <Route path="/questions" component={Questions} />
              <Route path="/story/:id" component={Article} />
              <Redirect to="/questions" />
            </Switch>
          );
        }}
      />
    </BrowserRouter>
  );
}

export default App;
