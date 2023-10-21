import { Route, Routes } from 'react-router'
import './App.css'
import { FilmPage }from './pages/FilmPage/FilmPage'
import { AddNewFilmPage } from './pages/AddNewFilmPage/AddNewFilmPage'
import Layout from './components/Layout/Layout'
import MainPage from './pages/MainPage/MainPage'



const App: React.FC = () => {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='film/:id' element={<FilmPage/>}/>
          <Route path='new-film' element={<AddNewFilmPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
