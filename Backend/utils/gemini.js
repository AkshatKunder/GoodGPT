import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
    // 1. Set up the URL with the API key as a query parameter
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // 2. Format the payload to match Gemini's structure
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: message
                }]
            }]
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // 3. Extract the clean text from Gemini's specific response tree
        return data.candidates[0].content.parts[0].text; 
    } catch (err) {
        console.log(err);
    }
};

export default getGeminiAPIResponse;