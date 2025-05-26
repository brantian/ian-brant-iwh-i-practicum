require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/', async (req, res) => {
    const pets = 'https://api.hubspot.com/crm/v3/objects/pets';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pets, { headers, params : {
            properties : 'name,favorite_meal,favorite_toy'
        } });
        const data = resp.data.results;
        res.render('homepage', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', async (req, res) => {

    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {

    const createPet = `https://api.hubspot.com/crm/v3/objects/pets`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        const { name, favorite_meal, favorite_toy } = req.body;

        await axios.post(createPet, { properties : { name, favorite_meal, favorite_toy} }, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err.response.data);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));