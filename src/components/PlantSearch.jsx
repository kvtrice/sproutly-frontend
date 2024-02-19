import React, { useState } from "react";

const PlantSearch = () => {
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
	const [searchResults, setSearchResults] = useState(['Aloe vera', 'Calathea', 'Monstera']);
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

	const handleSelectedPlants = (plant) => {
			console.log("Adding plant:", plant)
			setSelectedPlants([...selectedPlants, plant])
	};

	const handleRemovePlant = (e, plant) => {
    e.preventDefault()
		console.log("Removing plant:", plant);
		setSelectedPlants(
			selectedPlants.filter((selectedPlant) => selectedPlant !== plant)
		);
	};

	return (
		<div>
			<div>
				{selectedPlants.map((plant, index) => (
					<span key={index}>
						{plant}
						<button 
            
            onClick={() => handleRemovePlant(plant)}>
							x
						</button>
					</span>
				))}
			</div>
			<input
				className="input"
				type="text"
				value={searchQuery}
        onClick={e => setSearchResults(['Aloe vera', 'Calathea', 'Monstera'])}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				placeholder="Search for a plant tag"
			/>
			<ul>
				{searchResults.map((plant, index) => (
					<li key={index} onClick={(e) => handleSelectedPlants(e.target.dataset.plant)}>
						<p data-plant={plant}>{plant}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlantSearch;
