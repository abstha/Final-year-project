const router = require("express").Router();

router.post("/recommend", async (req, res) => {
  try {
    // Get the category and n from the request body
    const { category, n } = req.body;

    // Make a request to the recommendation AI endpoint
    const response = await axios.post("AI_RECOMMENDATION_ENDPOINT_URL", {
      category,
      n,
    });

    // Extract the recommended destinations from the response data
    const recommendedDestinations = response.data.recommended_destinations;

    // Return the recommended destinations as the API response
    res.json({ recommended_destinations: recommendedDestinations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;