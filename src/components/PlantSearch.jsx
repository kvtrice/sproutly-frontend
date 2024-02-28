import React, { useState, useEffect } from "react";
import "./PlantSearch.css";

const PlantSearch = ({
	selectedPlantTags,
	setSelectedPlantTags
}) => {
	// Hardcoded plant list as it's only a short list and not going to be editable by users. If we wanted users to add tags in the future this should be on the back end in it's own model
	const plants = [
		"Aloe vera",
		"Birds nest fern",
		"Boston fern",
		"Calathea",
		"Cast iron plant",
		"Chinese evergreen",
		"Devils ivy (Pothos)",
		"Dragon tree (Dracaena)",
		"English Ivy",
		"Fiddle leaf fig",
		"Flamingo lily (Anthurium)",
		"Jade plant",
		"Kentia palm",
		"Lavender",
		"Lucky bamboo",
		"Maidenhair fern",
		"Money tree (Pachira aquatica)",
		"Monstera",
		"Orchid",
		"Peace lily",
		"Philodendren",
		"Prayer plant (Maranta)",
		"Rubber plant (Ficus elastica)",
		"Snake plant (Sansevieria)",
		"Spider plant",
		"String of pearls",
		"Swiss cheese plant (Monstera deliciosa)",
		"Umbrella tree",
		"Venus flytrap",
		"ZZ plant",
	];

	// Strate to manage what the user is searching for in the search bar
	const [searchQuery, setSearchQuery] = useState("");
	// State to manage the results returned to the user
	const [searchResults, setSearchResults] = useState([]);
	// State to set the plant tags that have been selected from the search results - defaulted to selectedPlantTags if there are any
	const [selectedPlants, setSelectedPlants] = useState(
		selectedPlantTags || []
	);

	// Update the selectedPlants whenever selectedPlantTags changes
	useEffect(() => {
		setSelectedPlants(selectedPlantTags || []);
	}, [selectedPlantTags]);

	// Handler to handle what a user is typing in and set the searchQuery state accordingly
	const handleInputChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		// Filter the list of plants based on the query entered into the search bar
		const filteredResults = plants.filter((plant) =>
			plant.toLowerCase().includes(query.toLowerCase())
		);

		// Display the filtered list of plants to the user - max of 10 matches
		setSearchResults(filteredResults.slice(0, 10));
	};

	// When a user clicks away, reset the search query and results
	const handleInputBlur = () => {
		setSearchQuery("");
		setSearchResults([]);
	};

	// Function to set the selected plants so they can be displayed as tags above the search bar
	const handleSelectedPlants = async (plant) => {
		// Only add the plant the user selected if it's not already in the array
		if (!selectedPlants.includes(plant)) {
			// set the Selected Plants to
			await setSelectedPlants([...selectedPlants, plant]);

			// Also set the selectedPlantTAGS to the same list - the selectedPlantTAGS is different state used by the 'AllThreads' component to filter all posts based on what tags the user selected

			// They've been set separately because this component is used in many places (included when registering for a user profile and creating a post) - this way the selectedPlants state (which actually handles showing the tags above the bar) will be local to wherever this component is - otherwise when a user adds a plant to a post, a tag will also add in the navbar and that wouldn't make sense.
			await setSelectedPlantTags([...selectedPlants, plant]);
			// Reset search results after selection but set a timeout otherwise the search results get reset before the selectedPlantTags get set
			setTimeout(() => {
				setSearchResults([]);
			}, 200);
			// Reset the search query state
			setSearchQuery("");
		}
	};

	// Handler to remove the plant tags that appear above the search bar
	const handleRemovePlant = async (plant) => {
		// Update the selectedPlants state to only remove the single plant clicked (if multiple tags were added, this ensure the other remain)
		await setSelectedPlants(
			selectedPlants.filter((selectedPlant) => selectedPlant !== plant)
		);

		// Do the same for the selectedPlantTAGS as well
		await setSelectedPlantTags(
			selectedPlants.filter((selectedPlant) => selectedPlant !== plant)
		);
	};

	return (
		<div className="search-wrapper">
			<div className="tag-wrapper">
				{selectedPlants.map((plant, index) => (
					<div key={index} className="tag">
						<span className="tag-text">{plant}</span>
						<button
							type="button"
							className="tag-x-button"
							onClick={() => handleRemovePlant(plant)}
						>
							x
						</button>
					</div>
				))}
			</div>
			<input
				className="input"
				type="text"
				value={searchQuery}
				onClick={(e) => setSearchResults(plants)}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				placeholder="Search for a plant tag"
			/>
			{/* Map over the search results and display the plants in a list to the user */}
			<ul className="plant-list-wrapper">
				{searchResults.map((plant, index) => (
					<li
						onMouseDown={(e) => e.preventDefault()}
						key={index}
						data-plant={plant}
						onClick={() => handleSelectedPlants(plant)}
						className="plant-list-items"
					>
						{plant}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlantSearch;
