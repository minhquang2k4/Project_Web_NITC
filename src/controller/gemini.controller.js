const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.index = async (req, res) => {
    const genAI = new GoogleGenerativeAI('AIzaSyBj9Pw3gzSD6YbDWFuZQ0spe1UiA2b3UuI');
    async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello, I have 2 dogs in my house." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Great to meet you. What would you like to know?" }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
        const msg = "Do you know VietNamese";
        const result = await chat.sendMessage(msg);
        const response = result.response;
        const text = response.text();
        console.log(text);
        res.json({ text }); 
    }
    run();
}