import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import PaymentModal from './components/Payment';
import Home from './pages/Home';
import Success from './pages/Success';

const App = () => {

	return (
		<div>
			<Routes>
        <Route path="/" element={<div><Outlet /></div>}>
          <Route index element={<Home />} />
          <Route path="success" element={<Success />} />
        </Route>
      </Routes>
		</div>
	);
};

export default App;
