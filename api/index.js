const express = require('express');
const cors = require('cors')
const yts = require( 'yt-search' );
const { spotidown, SpotifyDown } = require('../function/spotify');
const { ytdl } = require('../function/youtube');
const { ddownr } = require('../function/ddownr');
const { downloadSpotify } = require('../function/spotiLink')
const path = require('path')
const {islamai}= require('../function/muslimAi')
const {sstik} = require('../function/tiktok')
const {lk21} = require('../function/lk21')
const app = express();
app.use(cors())
const port = 3000;

app.get('/',(req,res)=>{
res.sendFile('/view/index.html',{root:'./'})
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
app.get('/api/spotify/search',async(req,res)=>{
const spotiyUrl= req.query.search
const downloadSpotify = new SpotifyDown(spotiyUrl)
await downloadSpotify.download()
res.json(downloadSpotify.metadata)
})
// download spotify
app.get('/api/spotify/download',async(req,res)=>{
const spotiyUrl= req.query.url
const music = await downloadSpotify(spotiyUrl)
res.json(music)


})

// tiktok downloader 1
app.get('/api/tik-down/v1',async(req,res)=>{
    const url = req.query.url
    const data = await sstik(url)
    res.json({status:200,data})


})


// search movies lk21
app.get('/api/lk21/search',async(req,res)=>{
    const query = req.query.q
    const movies = await lk21.search(query)
    res.json(movies)
    

})


app.get('/api/lk21/download',async(req,res)=>{
    const slug = req.query.slug
    const movies = await lk21.getDlink(slug)
    res.json(movies)
    

})
app.get('/api/lk21/top-movie',async(req,res)=>{
    const page = req.query.page
    const movies = await lk21.getTopMovie(page)
    res.json(movies)
    

})
app.get('/api/lk21/latest-movie',async(req,res)=>{
    const page = req.query.page
    const movies = await lk21.getLatestMovie(page)
    res.json(movies)
    

})
app.get('/api/lk21/popular-movie',async(req,res)=>{
    const page = req.query.page
    const movies = await lk21.getPopularMovie(page)
    res.json(movies)
    

})
// muslim ai
app.get('/api/muslimai',async(req,res)=>{
    const text = req.query.question
    const response = await islamai(text)
    res.json(response)


})


// port
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
module.exports = app