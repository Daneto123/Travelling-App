import React, { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.tsx";
import StarRating from "../api/starRating.tsx";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";

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
};

const RestorantSuggest = ({ maxOut }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchDataYelp();
  }, []);

  const fetchDataYelp = async () => {
    try {
      const response = await fetch("http://130.204.81.247:3050/restaurants");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setCoordinates(jsonData.coordinates);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
  };

  const filteredData = data.filter((restaurant) => {
    const nameMatches =
      restaurant.name &&
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatches =
      restaurant.city &&
      restaurant.city.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatches || cityMatches;
  });

  const closeModal = () => {
    setSelectedRestaurant(null);
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
            Restaurant suggestions
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {filteredData.slice(0, maxOut).map((restaurant, index) => (
              <Card sx={{ margin: 1 }} key={index}>
                <CardMedia
                  sx={{ height: 100, margin: 1 }}
                  image={restaurant.image_url}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ borderBottom: 0.5, borderRight: 1, borderRadius: 1 }}
                    onClick={() => {
                      handleRestaurantClick(restaurant);
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
      {selectedRestaurant && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "flex", wrap: "wrap" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedRestaurant.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Location: {selectedRestaurant.location.city}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Phone: {selectedRestaurant.phone}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Price: {selectedRestaurant.price}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Rating: <StarRating totalStars={5} initialRating={selectedRestaurant.rating} />
            </Typography>
            <GoogleMaps
              lat={selectedRestaurant.coordinates.latitude}
              lng={selectedRestaurant.coordinates.longitude}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default RestorantSuggest;
