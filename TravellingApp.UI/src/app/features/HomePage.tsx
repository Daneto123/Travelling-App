import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Container } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestorantSuggest from "./RestorantSuggestPage.tsx";
import Wheather from "./WheatherPage.tsx";
import RentCar from "./RentCarPage.tsx";
import Hotels from "./Hotels.tsx";
import Monuments from "./Monuments.tsx";
import SliderComponent from '../layout/sliderComponent.tsx';

const Home = ({ newCity, newStartDate, newEndDate }) => {
  const [city, setCity] = useState("");
  //const [width, setWidth] = useState(window.innerWidth);
  //const [maxIn, setMaxIn] = useState(0);
  const [hasData, sethasData] = useState(false);

  // if(width < 700) {
  //   setMaxIn(3)
  // }
  // else if(width > 700 && width < 1400) {
  //   setMaxIn(4)
  // }
  // else {
  //   setMaxIn(5)
  // }

  // console.log(width)


  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("2024-06-01T15:30")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2024-06-08T15:30")
  );

  const goToHotelsPage = () => {
    window.location.href = "http://130.204.81.247:3000/hotels";
  };

  const goToMonumentsPage = () => {
    window.location.href = "http://130.204.81.247:3000/monuments";
  };

  const goReantACarPage = () => {
    window.location.href = "http://130.204.81.247:3000/rentCar";
  };

  const goToRestaurantsPage = () => {
    window.location.href = "http://130.204.81.247:3000/restorantSuggest";
  };

  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    if (storedCity !== null) {
      setCity(storedCity);
      newCity(storedCity);
      console.log(city);
      sethasData(true);
    }
  }, [newCity]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (city !== '') {
      localStorage.setItem('city', city);
    }

    window.location.reload();

    //console.log(window.innerWidth)
    console.log("daneto" + newCity);
    newStartDate(startDate ? startDate.format('YYYY-MM-DD') : '2024-06-01');
    newEndDate(endDate ? endDate.format('YYYY-MM-DD') : '2024-06-08');

    fetch("http://130.204.81.247:3050/restaurantsData", {
      method: "POST",
      body: JSON.stringify({ city }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("http://130.204.81.247:3060/rentCarData", {
      method: "POST",
      body: JSON.stringify({ city, startDate, endDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    sethasData(true);
  };

  return (
    <>
      <Box
        component="form"
        height={90}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ borderBottom: "1px solid grey" }}
      >
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateTimePicker", "DateTimePicker"]}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DateTimePicker
              label="Start date"
              defaultValue={dayjs("2022-04-17T15:30")}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateTimePicker", "DateTimePicker"]}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DateTimePicker
              label="End date"
              defaultValue={dayjs("2022-04-17T15:30")}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          sx={{ display: "flex" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Box>
      {hasData ? (
        <>
          <Box
            sx={{
              borderBottom: 0.5,
              borderRight: 0.5,
              borderRadius: 1,
              padding: 0.5,
            }}
          >
            <RestorantSuggest maxOut={3} />
            <Button variant="contained" onClick={goToRestaurantsPage}>
              See more
            </Button>
          </Box>
          <Box
            sx={{
              borderBottom: 0.5,
              borderRight: 0.5,
              borderRadius: 1,
              padding: 0.5,
            }}
          >
            <RentCar maxOut={3} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goReantACarPage}
            >
              See more
            </Button>
          </Box>
          <Box
            component="form"
            height="fit-content"
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey" }}
          >
            <Monuments maxOut={3} city={city} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goToMonumentsPage}
            >
              See more
            </Button>
          </Box>
          <Box
            component="form"
            height="fit-content"
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "1px solid grey" }}
          >
            <Hotels maxOut={3} city={city} startDate={startDate ? startDate.format('YYYY-MM-DD') : 'No start date selected'} endDate={endDate ? endDate.format('YYYY-MM-DD') : 'No start date selected'} />
            <Button
              sx={{ display: "flex" }}
              variant="contained"
              onClick={goToHotelsPage}
            >
              See more
            </Button>
          </Box>
        </>
      ) : (
        <SliderComponent />
      )}
    </>
  );
};

export default Home;
