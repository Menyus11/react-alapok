import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { 
  ListingPosts,
  Calculator
 } from './components';


function PictureViewer() {
  return <h2>Ez a fotó oldal tartalma ...</h2>
}

function App() {
  return (
    <div className="App">
      <h1 className='bg-success mb-0 pb-2'>React - a nyelv alapjai - témazáró feladatok</h1>

      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <nav>
              <Link to="/" className='text-light m-3' style={{textDecoration: "none", fontSize: "1.5vw"}} ><b>Postok listázása</b></Link>
              <Link to="calculator" className='text-light m-3' style={{textDecoration: "none", fontSize: "1.5vw"}} ><b>Számológép</b></Link>
              <Link to="pictureviewer" className='text-light m-3' style={{textDecoration: "none", fontSize: "1.5vw"}} ><b>Fotó / Videó album</b></Link>
            </nav>
          </div>
        </nav>

        <Routes>
          <Route index element={<ListingPosts />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/pictureviewer" element={<PictureViewer />} />

        </Routes>

      </BrowserRouter>




    </div>
  );
}

export default App;
