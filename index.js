const express = require('express');
const cors = require('cors');
const app = express();
const port = 1000;
const ytdl = require("@distube/ytdl-core");

app.use(cors());

app.get('/download', async (req, res) => {
    const url = req.query.url;

    try {
        // Get video basic info
        const basicInfo = await ytdl.getBasicInfo(url);
        console.log(basicInfo)    
        // Get video info with download formats
        const fullInfo = await ytdl.getInfo(url);
        console.log(fullInfo)
        // Combine the information into one object
        const responseData = {
            title: basicInfo.videoDetails.title,
            formats: fullInfo.formats
        };

        // Send the response as JSON
        res.json(responseData);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the video information' });
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
