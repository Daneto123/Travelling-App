import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./nav/NavBar.tsx";
import Footer from "./footer/Footer.tsx";
import { initializeTheme } from "./Theme.ts";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Home from "../features/HomePage.tsx";
import RestorantSuggest from "../features/RestorantSuggestPage.tsx";
import WeatherChart from "../features/WheatherPage.tsx";
import RentCar from "../features/RentCarPage.tsx";
import Hotels from "../features/Hotels.tsx";
import Monuments from "../features/Monuments.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const expandedKey = "containerExpanded";

  const containerExpanded = localStorage.getItem(expandedKey);

  const [expanded, SetExpanded] = useState<boolean>(
    JSON.parse(containerExpanded!)
  );

  const theme = initializeTheme();

  const [sharedData, setSharedData] = useState(null);
  const [startDateData, setstartDateData] = useState(null);
  const [endDateData, setendDateData] = useState(null);

  const handleDataChange = (data) => {
    setSharedData(data);
  };

  const handlestartDateDataChange = (data) => {
    setstartDateData(data);
  };

  const handleendDateDataChange = (data) => {
    setendDateData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        maxWidth={expanded ? false : undefined}
        data-testid="page-container"
        sx={{ marginTop: 5 }}
      >
        <Routes>
          <Route path="/" element={<Home newCity={handleDataChange} newStartDate={handlestartDateDataChange} newEndDate={handleendDateDataChange} />} />
          <Route path="/wheather" element={<WeatherChart />} />
          <Route path="/restorantSuggest" element={<RestorantSuggest maxOut={30} />} />
          <Route path="/rentCar" element={<RentCar maxOut={60} />} />
          <Route path="/hotels" element={<Hotels maxOut={30} city={sharedData} startDate={startDateData} endDate={endDateData} />} />
          <Route path="/monuments" element={<Monuments maxOut={20} city={sharedData} />} />
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
