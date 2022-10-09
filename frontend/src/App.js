import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Recipes from "./Components/Recipes";
import RecipeRecommendations from "./Components/RecipeRecommendations";
import NavBar from "./Components/Navbar";
import Order from "./Components/Order";
import { useState } from 'react';


function App() {
  const [order, setOrder] = useState([]);
  const handleOrder = (order) => {
    setOrder(order)
  }
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="recipes" element={<Recipes/>} />
          <Route path="recommendations" element={<RecipeRecommendations handleOrder={handleOrder}/>}/>
          <Route path="order" element={<Order order={order}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
