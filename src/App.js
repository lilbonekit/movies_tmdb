import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Spinner from './components/Spinner/Spinner';

import React from 'react';
import { Suspense } from 'react';

const LazyHomepage = React.lazy(() => import('./components/pages/Homepage/Homepage'));
const LazySingleMoviePage = React.lazy(() => import('./components/pages/SingleMoviePage/SingleMoviePage'));
const LazyLibraryMoviesPage = React.lazy(() => import('./components/pages/LibraryMoviesPage/LibraryMoviesPage'));
const LazyNotFoundPage = React.lazy(() => import('./components/pages/NotFoundPage/NotFoundPage'));

function App() {
    return (
        <Suspense fallback={<Spinner style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>}>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<LazyHomepage/>}/>
                    <Route path='movie/:id' element={<LazySingleMoviePage/>}/>
                    <Route path='library' element={<LazyLibraryMoviesPage/>}/>
                    <Route path='*' element={<LazyNotFoundPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App;
