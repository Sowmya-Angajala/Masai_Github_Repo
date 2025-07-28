import Header from "./components/header";
import Navbar from "./components/navbar";
import Section from "./components/section";
import Footer from "./components/footer";

import './App.css';
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Section />
      <Footer />
      <Card/>
    </div>
  );
}
export default App;
