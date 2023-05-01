import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import RentCar from './pages/RentCar';
import AdminMain from './pages/Admin/AdminMain';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="main-panel">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/rent" element={<RentCar />} />
							<Route path="/admin" element={<AdminMain />} />
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		);
	}
}

export default App;