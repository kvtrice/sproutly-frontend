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
	const [imageError, setImageError] = useState("");

	// In the case of editing or updating images (e.g. on the post edit screen) we don't currently display the image direct to the user. So when that happend we can instead display a filename of 'Image' to signify that there is in fact already an image on the thing they're editing.
	useEffect(() => {
		if (initialImageUrl) {
			setFileName("Image");
		}
	}, [initialImageUrl]);

	// Function to upload the file
	const uploadFile = async () => {
		// Set up the file to be uploaded using FormData
		const data = new FormData();
		// Append the cloudinary presets for the type of file
		data.append("file", image);
		data.append("upload_preset", "images");

		try {
			// set state so we can display a loading icon during upload
			setIsUploading(true);
			let api = "https://api.cloudinary.com/v1_1/djtgmjm16/image/upload";
			// POST to the cloudinary API endpoint passing in the file data
			const res = await fetch(api, {
				method: "POST",
				body: data,
			});

			const responseData = await res.json(); // Parse the JSON response
			const secure_url = responseData.secure_url; // Access secure_url from the parsed response
			setImageUrl(secure_url);
			// Stop the loading icon from displaying
			setIsUploading(false);
			// Setting this state to true triggers another icon to display (a check mark) so the user can be sure their image uploaded successfully
			setUploaded(true);
		} catch (err) {
			console.error(err);
		}
	};

	// Handler for when the file changes
	const handleFileChange = async (e) => {
		// uses setImage to set the selected file in state
		const file = e.target.files[0];
		setImage(file);
		// Sets the filename in state from the selectd file
		setFileName(file.name);
		// Sets an error in state as a reminder to users to click the uplaod button - because currently the upload flow is a 2 step process and user testing showed that many users forgot to upload the image
		setImageError("Click 'upload' to upload your image");
	};

	// Upload handler to upload the file
	const handleUpload = (e) => {
		e.preventDefault();
		uploadFile();
	};

	return (
		<div>
			<div className="error-container">
				{/* Only display the error if the users hasn't uploaded it. Once uploaded the error should disappear */}
				{imageError && uploaded ? "" : <p className="error-message image">{imageError}</p>}
			</div>
			<div className="file is-small has-name image-upload-wrapper">
				<label className="file-label image-file">
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
					{/* Display the filename to the user */}
					<span className="file-name">{fileName}</span>
				</label>
				<button
					className="button upload-button is-light is-small"
					onClick={handleUpload}
				>
					Upload
				</button>
				<div className="uploading-icons-container">
					{/* Loading icon for when the image is uploaded and a check to display once it's finished uploading (isUploaded) */}
					<div className="uploading-icons">
						{/* Chained ternary to check both 'isUploading' and 'upLoaded and set blank if neither */}
						{isUploading ? (
							<ThreeDots
								className="icon-loading"
								fill="#B7E4C7"
								size={20}
							/>
						) : uploaded ? (
							<FaCheck className="check" size={20} fill="#B7E4C7" />
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageUpload;