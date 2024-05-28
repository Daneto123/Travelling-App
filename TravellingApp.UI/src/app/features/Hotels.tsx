import React, { useEffect, useState } from "react";
import StarRating from "../api/starRating.tsx";
import GoogleMaps from "./GoogleMaps.tsx";
import { Box, Button, Card, CardActions, CardContent, CardMedia, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  flexWrap: "wrap",
};
const Hotels = ({maxOut, city, startDate, endDate}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

  const formattedCity = city;
  const formattedStartDate = startDate;
  const formattedEndDate = endDate;

  useEffect(() => {
      fetchDataHotels();
  }, []);


  //да не се пуска, защото има ограничени извиквания
  const fetchDataHotels = async () => {
      try {
      const response = await fetch(`http://130.204.81.247:8000/hotels/${formattedCity}/${formattedStartDate}/${formattedEndDate}`);
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log(jsonData.properties);
      setData(jsonData.properties);
      } catch (error) {
      console.error('Error fetching data:', error);
      } finally {
      setLoading(false);
      }
  };

  const handleHotelsClick = (hotel: any) => {
      setSelectedHotel(hotel);
      console.log(hotel);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeModal = () => {
    setSelectedHotel(null);
  };

  return (
    <>
      {loading ? (
        <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            Hotel suggestions
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.slice(0, maxOut).map((hotel, index) => (
              <Card sx={{ margin: 1 }} key={index}>
                <CardMedia
                  sx={{ height: 100, margin: 1 }}
                  image={hotel.images[0].thumbnail}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ borderBottom: 0.5, borderRight: 1, borderRadius: 1 }}
                    onClick={() => {
                      handleHotelsClick(hotel);
                      setOpen(true);
                    }}
                  >
                    See more
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
      {selectedHotel && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "flex", wrap: "wrap" }}
        >
          <Box sx={{...style, maxHeight: "80vh", overflowY: "auto", overflowX: "hidden"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedHotel.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Info
              <List>
                {selectedHotel.essential_info.map((info, index) => (
                  <ListItem key={index} >
                    <ListItemText
                      primary={info}
                    />
                  </ListItem>
                ))}
              </List>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Check in time: {selectedHotel.check_in_time}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Check in time: {selectedHotel.check_out_time}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Before taxes fees: {selectedHotel.total_rate.before_taxes_fees}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Rating: <StarRating totalStars={5} initialRating={selectedHotel.overall_rating} />
            </Typography>
            <GoogleMaps lat= {selectedHotel.gps_coordinates.latitude} lng={selectedHotel.gps_coordinates.longitude} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Amenities
              <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {selectedHotel.amenities.map((amenitie, index) => (
                  <ListItem key={index} sx={{ display: 'inline', width: 'auto', paddingRight: 2 }}>
                    <ListItemText
                      primary={amenitie}
                    />
                  </ListItem>
                ))}
              </List>
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Hotels;
