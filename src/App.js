import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  ListingPosts,
  Calculator,
  HomePage,
  PicturesPage,
  VideoPage,
  AccountPage
} from './components';

function App() {
  return (
    <div className="App">
      <h1 className='bg-success mb-0 pb-2'>React - a nyelv alapjai - témazáró feladatok</h1>

      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <nav>
              <Link to="/" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Home</b></Link>
              <Link to="pictures" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Fotók</b></Link>
              <Link to="videos" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Videók</b></Link>
              <Link to="posts" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Posztok</b></Link>
              <Link to="calculator" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Számológép</b></Link>
              <Link to="login" className='text-light m-3' style={{ textDecoration: "none", fontSize: "1.3vw" }} ><b>Bejelentkezés</b></Link>

            </nav>
          </div>
        </nav>

        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/pictures" element={<PicturesPage />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/posts" element={<ListingPosts />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/login" element={<AccountPage />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
