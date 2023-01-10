export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //const formData = new formData();
      //formData.append("image", req.body);
      //console.log(req.body);

      res.status(200).json({ message: req.body });
      /*
      const resImgur = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_ID}`,
          
        },
      });
      res.status(200);
      */
      //return req.body;
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
