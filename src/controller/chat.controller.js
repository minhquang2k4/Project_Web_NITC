const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const Library = require("../model/library.model.js");
const chatHistory = require("../model/chat.model.js");

module.exports.getChat = async (req, res) => {
	const libraryId = req.params.id;
	const library = await Library.findById(libraryId);
	const chat = library?.chatId
		? await chatHistory.findById(library.chatId)
		: null;
	if (chat) {
		res.json(chat.history);
	} else {
		res.json([]);
	}
};

module.exports.postChat = async (req, res) => {
	try {
		const genAI = new GoogleGenerativeAI(
			"AIzaSyBj9Pw3gzSD6YbDWFuZQ0spe1UiA2b3UuI",
		);

		const { msg, libraryId } = req.body;


        const library = await Library.findById(libraryId);

        const history = await chatHistory.findById(library.chatId);
		const simplifiedHistory = history ? history.history.map(item => ({
			role: item.role,
			parts: item.parts.map(part => ({ text: part.text }))
		})) : [];
		

		async function run() {
			try {
				const model = genAI.getGenerativeModel({ model: "gemini-pro" });
				const chat = model.startChat({
					history: simplifiedHistory,
				});
				const result = await chat.sendMessage(msg);
				const response = await result.response;
				const text = response.text();

                const newMessage = {
                    role: "user",
                    parts: [{ text: msg }],
                };

                const newResponse = {
                    role: "model",
                    parts: [{ text }],
                };

                if (history) {
                    history.history.push(newMessage);
                    history.history.push(newResponse);
                    await history.save();
                } else {
                    const newHistory = new chatHistory({
                        history: [newMessage, newResponse],
                    });
                    await newHistory.save();
                    library.chatId = newHistory._id;
                    await library.save();
                }

				res.json([newMessage, newResponse]);
			} catch (error) {
				res.status(500).send(error.message);
			}
		}
		run();
	} catch (error) {
		res.status(500).send(error.message);
	}
};
