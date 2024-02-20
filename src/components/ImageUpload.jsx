import React, { useState } from "react";

const ImageUpload = ({ setImageUrl}) => {
	const [image, setImage] = useState(null)
	const [fileName, setFileName] = useState("new_image.jpg")

	const uploadFile = async () => {
		const data = new FormData()
		data.append("file", image)
		data.append("upload_preset", "images")

		try {
			let api = "https://api.cloudinary.com/v1_1/djtgmjm16/image/upload"
			const res = await fetch(api, {
				method: 'POST',
				body: data
			  })

			  const responseData = await res.json() // Parse the JSON response
			  const secure_url = responseData.secure_url // Access secure_url from the parsed response
			  console.log(secure_url)
			  await setImageUrl(secure_url)

		} catch (err) {
			console.error(err)
		}
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		setImage(file)
		setFileName(file.name)
	}

	const handleUpload = (e) => {
		e.preventDefault()
		uploadFile()
	}

	return (
		<div className="file has-name">
			<label className="file-label">
				<input
					className="file-input"
					type="file"
					onChange={(e) => handleFileChange(e)}
				></input>
				<span className="file-cta">
					<span className="file-icon">
						<i className="fas fa-upload"></i>
					</span>
					<span className="file-label">Choose a file…</span>
				</span>
				<span className="file-name">{fileName}</span>
			</label>
			<button className="button" onClick={handleUpload} >Upload</button>
		</div>
	);
};

export default ImageUpload;
