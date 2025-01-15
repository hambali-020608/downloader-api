const express = require('express');
const cors = require('cors')
const yts = require( 'yt-search' );
const { spotidown, SpotifyDown } = require('../function/spotify');
const { ytdl } = require('../function/youtube');
const { ddownr } = require('../function/ddownr');
const path = require('path')


const app = express();
app.use(cors())
const port = 3000;

app.get('/',(req,res)=>{
res.sendFile('/view/index.html',{root:'../'})
})


// searching youtube
app.get('/api/youtube/search', async (req, res) => {
    const videoUrl = req.query.q;
    const r = await yts(videoUrl)
    const videos = r.videos.slice( 0, 3 )
    res.json(videos)
});

// download ddownr
app.get('/api/youtube/download',async(req,res)=>{
    const url = req.query.url
    const format = req.query.format
    const video = await ddownr.download(url,format)
    res.json(video)
})

// yttomp4 pro
app.get('/api/youtube/v2/download',async(req,res)=>{
    const url = req.query.url
    const video = await ytdl(url)
    res.json(video)
})

// search spotify
app.get('/api/spotify/download',async(req,res)=>{
const spotiyUrl= req.query.search
const downloadSpotify = new SpotifyDown(spotiyUrl)
await downloadSpotify.download()
res.json(downloadSpotify.metadata)
})




// port
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
module.exports = app