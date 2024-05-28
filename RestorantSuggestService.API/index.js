const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;
const DeployAddress = process.env.DEPLOYADDRESS;

const rejectAuth = process.env.NODE_TLS_REJECT_UNAUTHORIZED;

app.use(cors());
app.use(bodyParser.json());

const YELP_API_KEY = process.env.YELPKEY;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'Documentation for Express API',
    },
    servers: [
      {
        url: `http://${DeployAddress}:${PORT}`,
      },
    ],
  },
  apis: [__filename],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

let cityGlobal = "";

app.get("/", (req, res) => res.send("Express on Vercel"));

/**
 * @swagger
 * /restaurantsData:
 *   post:
 *     summary: Set city for user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal Server Error
 */
app.post('/restaurantsData', async (req, res) => {
  const jsonString = JSON.stringify(req.body.city);
  var city = jsonString.replace(/"/g, '');
  cityGlobal = city;
});

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Returns all restaurants
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal Server Error
 */
app.get('/restaurants', async (req, res) => {

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        location: `${cityGlobal}`,
        limit: 30,
      },
    });

    const restaurants = response.data.businesses;
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, DeployAddress, () => {
  console.log(`Server is running on server ${DeployAddress} port ${PORT}`);
});
