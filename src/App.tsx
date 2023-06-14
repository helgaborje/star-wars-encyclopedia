import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import MoviesPage from './pages/MoviesPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import MoviePage from './pages/MoviePage'
import NotFound from './pages/NotFound'

const App = () => {

	return (
		<>
			<div id="App">
				<Navigation />
				<Container className='py-3'>
					<Routes>
						<Route path='/' element={<HomePage/>} />
						<Route path='/films' element={<MoviesPage />} />
						<Route path='/films/:id' element={<MoviePage />} />
						<Route path='/people' element={<PeoplePage />} />
						<Route path='/people/:id' element={<PersonPage/>} />

						<Route path="*" element={<NotFound />} />
					</Routes>

			</Container>
			
			</div>
		</>
	)
}

export default App
