import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.listen(4000, () => {
    console.log('Listening on port 4000');
});