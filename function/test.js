import * as cheerio from 'cheerio';

const response = await fetch('https://tv10.lk21official.life/top-movie-today/');
const html = await response.text();
const $ = cheerio.load(html);

// Ambil semua teks dari <script> dalam <article>
const scriptsText = $('article script').map((i, el) => $(el).text().trim()).get();

// Proses hanya yang valid JSON
const scriptsJSON = scriptsText.map(text => {
    try {
        // Ambil hanya bagian JSON dengan regex
        const match = text.match(/\{.*\}/s);
        if (match) {
            return JSON.parse(match[0].replace(/[\u0000-\u001F]+/g, '')); // Hapus karakter kontrol
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
    return null;
}).filter(Boolean); // Hapus nilai `null`


