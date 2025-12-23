import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

// current weather details

app.get('/weather', async(req,res)=>{
    const city=req.query.city;
    if (!city) {
    return res.status(400).json({ message: "City is required!" });
    }
    try {
        const response1 = await axios.get(
            `${process.env.API_URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );
        res.json(response1.data);
    } catch (e) {
        res.status(500).json({ message: 'City not found or API error' });
    }
});

// forecast details

app.get('/forecast', async(req,res)=>{
    const city=req.query.city;
    if (!city) {
    return res.status(400).json({ message: "City is required!" });
    }
    try {
        const response2 = await axios.get(
            `${process.env.FORCAST_API_URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );
        res.json(response2.data);
    } catch (e) {
        res.status(500).json({ message: 'City not found or API error' });
    }
});

const port = process.env.port || 3000 ;

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})