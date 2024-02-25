import React, { useState, useEffect } from "react";
import "./ImageUpload.css";
import { ThreeDots } from "react-loading-icons";
import { FaCheck } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

const ImageUpload = ({ setImageUrl, initialImageUrl }) => {
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("...");
	const [isUploading, setIsUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	useEffect(() => {
		if (initialImageUrl) {
			setFileName("Image");
		}
	}, [initialImageUrl]);

	const uploadFile = async () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "images");

		try {
			setIsUploading(true);
			let api = "https://api.cloudinary.com/v1_1/djtgmjm16/image/upload";
			const res = await fetch(api, {
				method: "POST",
				body: data,
			});

			const responseData = await res.json(); // Parse the JSON response
			const secure_url = responseData.secure_url; // Access secure_url from the parsed response
			setImageUrl(secure_url);
			setIsUploading(false);
			setUploaded(true);
		} catch (err) {
			console.error(err);
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		setImage(file);
		setFileName(file.name);
	};

	const handleUpload = (e) => {
		e.preventDefault();
		uploadFile();
	};

	return (
		<div className="file is-small has-name">
			<label className="file-label">
				<input
					className="file-input"
					type="file"
					onChange={(e) => handleFileChange(e)}
				></input>
				<span className="file-cta">
					<span className="file-icon">
						<MdOutlineFileUpload />
					</span>
					<span className="file-label">Choose image</span>
				</span>
				<span className="file-name">{fileName}</span>
			</label>
			<button
				className="button upload-button is-light is-small"
				onClick={handleUpload}
			>
				Upload
			</button>
			<div className="uploading-icons-container">
				<div className="uploading-icons">
					{isUploading ? (
						<ThreeDots className="icon-loading" fill="#000000" />
					) : uploaded ? (
						<FaCheck className="check" />
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;