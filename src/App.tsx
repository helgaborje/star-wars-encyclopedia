import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import MoviesPage from './pages/MoviePages/MoviesPage'
import PeoplePage from './pages/PeoplePages/PeoplePage'
import PersonPage from './pages/PeoplePages/PersonPage'
import MoviePage from './pages/MoviePages/MoviePage'
import NotFound from './pages/NotFound'
import PlanetsPage from './pages/PlanetPages/PlanetsPage'
import PlanetPage from './pages/PlanetPages/PlanetPage'

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
						<Route path='/people/:id' element={<PersonPage />} />

						<Route path='/planets' element={<PlanetsPage />} />
						<Route path='/planets/:id' element={<PlanetPage />} />
						{/* <Route path='/species' element={<SpeciesPage />} />
						<Route path='/species/:id' element={<SpeciePage />} />
						<Route path='/starships' element={<starshipsPage />} />
						<Route path='/starships/:id' element={<StarshipsPage />} />
						<Route path='/vehicles' element={<VehiclesPage />} />
						<Route path='/vehicles/:id' element={<VehiclePage/>} /> */}

						<Route path="*" element={<NotFound />} />
					</Routes>

			</Container>
			
			</div>
		</>
	)
}

export default App
