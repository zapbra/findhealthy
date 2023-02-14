import supabase from "../utils/supabaseClient";
import { fetchLocations } from "../utils/supabaseFunctions";

function generateSiteMap(locations) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://www.healthyfoodmap.com/</loc>
    <priority>1.00 </priority>
    <changefreq>weekly</changefreq>
  </url>
    </urlset>
    `;
}

function SiteMap(locations) {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const locations = await fetchLocations();

  const sitemap = generateSiteMap(locations);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser]
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;
