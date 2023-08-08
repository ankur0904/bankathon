const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require('fs');
const pdfParse = require('pdf-parse');





app.use(cors());
const uploadFolder = "uploads";

// Define the maximum size for uploading
const maxSize = 12 * 1000 * 1000; // 12 MB

const readPdf = async (uri) => {
    const buffer = fs.readFileSync(uri);
    try {
        const data = await pdfParse(buffer);
        // console.log('Content: ', data.text);
		return data.text;
    }catch(err){
        throw new Error(err);
    }
};

// Disk Storage Setup
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads'); // Use './uploads' instead of 'uploads'
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

// File Filter Setup
const fileFilter = function (req, file, cb) {
	const filetypes = /pdf|docx|png/; // Update this regex as needed
	const mimetype = filetypes.test(file.mimetype);
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	if (mimetype && extname) {
		return cb(null, true);
	}
	cb("Error: File upload only supports the following filetypes - " + filetypes);
};
const upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: fileFilter,
}).array("resume", 5); // Handle up to 5 files



app.post("/uploadProfilePicture",async function (req, res, next) {
	upload(req, res, async function (err) {
		if (err) {
			console.error("Error uploading files:", err);
			res.status(500).json({ error: "Error uploading files" });
		} else {
			// Handle files and other form data
			console.log("Files uploaded:", req.files);
			const description = req.body.description;
			
			// Process the files and description as needed
			let data = await readPdf('./uploads/resume.pdf');
			const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;
			const foundEmails = data.match(emailRegex);
			
			foundEmails[0], 
			res.json({ message: data });
		}
	});
});


const port = 8080;
app.listen(port, function (error) {
	if (error) throw error;
	console.log("Server created Successfully on PORT " + port);
});
