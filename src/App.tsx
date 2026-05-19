import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import AddIdeaPage from './pages/AddIdeaPage';
import EditIdeaPage from './pages/EditIdeaPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/add" element={<AddIdeaPage />} />
        <Route path="/edit/:id" element={<EditIdeaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;