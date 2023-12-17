import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Homepage from './components/pages/Homepage/Homepage';
import SingleMoviePage from './components/pages/SingleMoviePage/SingleMoviePage';
import LibraryMoviesPage from './components/pages/LibraryMoviesPage/LibraryMoviesPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Homepage/>}/>
                <Route path='movie/:id' element={<SingleMoviePage/>}/>
                <Route path='library' element={<LibraryMoviesPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;
