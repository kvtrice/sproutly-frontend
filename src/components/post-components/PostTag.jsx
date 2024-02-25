import React from 'react'

function PostTag({
	post,
	setSelectedPlantTags,
	selectedPlantTags,
	selectedPlants,
	setSelectedPlants,
}) {
	const handleSelectedPlants = async (tag) => {
		if (!selectedPlants.includes(tag)) {
			await setSelectedPlants([...selectedPlants, tag]);
			await setSelectedPlantTags([...selectedPlants, tag]);
		}
	};

	return (
		<div className="post-tags-wrapper">
			{post.tags.map((tag, index) => (
				<span
					key={index}
					className="post-tags tag"
					onClick={() => handleSelectedPlants(tag)}
				>
					{tag}
				</span>
			))}
		</div>
	);
}

export default PostTag