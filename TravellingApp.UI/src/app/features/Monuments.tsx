import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

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
const Monuments = ({maxOut, city}) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonument, setSelectedMonument] = useState<any | null>(null);

    console.log(city);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch(`http://130.204.81.247:8008/monuments/${city}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log(jsonData.items);
        setData(jsonData.items);
        // dataProvider - name
        // dcDescription - description
        // edmPreview - image
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleMonumentClick = (monument: any) => {
        setSelectedMonument(monument);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const closeModal = () => {
      setSelectedMonument(null);
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
            Monument suggestions
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.slice(0, maxOut).map((monument, index) => (
              <Card sx={{ margin: 1 }} key={index}>
                <CardMedia
                  sx={{ height: 100, margin: 1 }}
                  image={monument.edmPreview}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {monument.dataProvider}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ borderBottom: 0.5, borderRight: 1, borderRadius: 1 }}
                    onClick={() => {
                      handleMonumentClick(monument);
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
      {selectedMonument && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "flex", wrap: "wrap" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedMonument.dataProvider}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description: {selectedMonument.dcDescription}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Monuments;
