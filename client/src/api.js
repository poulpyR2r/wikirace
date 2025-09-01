import axios from 'axios';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';
export async function fetchWikiHtml(title) {
    const { data } = await axios.get(`${SERVER_URL}/api/wiki/${encodeURIComponent(title)}`);
    return data;
}
