import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"
import Footer from "./layouts/Footer";
import Page from "./layouts/Page";

const App = () => {

  const user = useSelector((state) => state.user);

    return (
      <Router>
      <main>
        {/* {user.name !== '' ? <Page/> : <Login />} */}
        <Page />
      </main>
      <Footer/>
    </Router>
    )
};

export default App;