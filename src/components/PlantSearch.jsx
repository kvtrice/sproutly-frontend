import React, { useState } from "react";

const PlantSearch = ({ setSelectedPlantTags }) => {
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

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedPlants, setSelectedPlants] = useState([]);

	const handleInputChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		const filteredResults = plants.filter((plant) =>
			plant.toLowerCase().includes(query.toLowerCase())
		);

		setSearchResults(filteredResults.slice(0, 10));
	};

	const handleInputBlur = () => {
		setSearchQuery("");
		setSearchResults([]);
	};

	const handleSelectedPlants = async (plant) => {
		if (!selectedPlants.includes(plant)) {
			await setSelectedPlants([...selectedPlants, plant])
			await setSelectedPlantTags([...selectedPlants, plant])
			setTimeout(() => {
				setSearchResults([])
			}, 200)
			setSearchQuery('')
		}
	};

	const handleRemovePlant = async (plant) => {
		await setSelectedPlants(
			selectedPlants.filter((selectedPlant) => selectedPlant !== plant)
		)
		await setSelectedPlantTags(selectedPlants.filter((selectedPlant) => selectedPlant !== plant))
	};

	return (
		<div>
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
				onClick={(e) => setSearchResults(plants.slice(0, 10))}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				placeholder="Search for a plant tag"
			/>
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
