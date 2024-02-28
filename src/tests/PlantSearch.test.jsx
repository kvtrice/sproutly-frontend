import "@testing-library/jest-dom";
import {
	render,
	fireEvent,
	act,
	waitFor,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PlantSearch from "../components/PlantSearch";

describe("Plant Search component", () => {
	it("Renders the search bar", () => {
		const { getByPlaceholderText } = render(<PlantSearch />);
		expect(
			getByPlaceholderText("Search for a plant tag")
		).toBeInTheDocument();
	});

	it("Plant tags can be selected and added", async () => {
		const { getByPlaceholderText, queryAllByText, queryByText } = render(
			<PlantSearch setSelectedPlantTags={() => {}} />
		);

		const inputElement = getByPlaceholderText("Search for a plant tag");

		// Simulate typing and choosing a plant tag
		act(() => {
			fireEvent.change(inputElement, { target: { value: "Aloe vera" } });
		});

		// Get all elements with text "Aloe vera"
		const aloeVeraElement = queryAllByText("Aloe vera");

		// Filter the elements to find the one with the class "plant-list-items"
		const plantListItem = aloeVeraElement.find((element) =>
			element.classList.contains("plant-list-items")
		);

		// Click on the plant list item
		act(() => {
			fireEvent.click(plantListItem);
		});

		// Once the plant list item is clicked, the tag that has been selected should then be added above the search bar and visible in the document
		await waitFor(() => {
			const selectedTag = queryByText((content, element) => {
				return (
					element.tagName.toLowerCase() === "span" &&
					element.classList.contains("tag-text") &&
					content === "Aloe vera"
				);
			});

			expect(selectedTag).toBeInTheDocument();
		});
	});

	it("Selected plant tags can be removed", async () => {
		const { getByPlaceholderText, queryAllByText, queryByText } = render(
			<PlantSearch setSelectedPlantTags={() => {}} />
		);

		const inputElement = getByPlaceholderText("Search for a plant tag");

		// Simulate typing and choosing a plant tag
		act(() => {
			fireEvent.change(inputElement, { target: { value: "Aloe vera" } });
		});

		// Get all elements with text "Aloe vera"
		const aloeVeraElement = queryAllByText("Aloe vera");

		// Filter the elements to find the one with the class "plant-list-items"
		const plantListItem = aloeVeraElement.find((element) =>
			element.classList.contains("plant-list-items")
		);

		// Click on the plant list item
		act(() => {
			fireEvent.click(plantListItem);
		});

		// Once the plant list item is clicked, the tag that has been selected should then be added above the search bar and visible in the document
		await waitFor(() => {
			const selectedTag = queryByText((content, element) => {
				return (
					element.tagName.toLowerCase() === "span" &&
					element.classList.contains("tag-text") &&
					content === "Aloe vera"
				);
			});

			expect(selectedTag).toBeInTheDocument();
		});

        // Target the 'x' button to remove a tag
        const removeButton = queryByText((content, element) => {
            return (
                element.classList.contains("tag-x-button") && 
                content === "x"
            )
        })

        // Click on the Remove button on the selected Plant Tag
		act(() => {
			fireEvent.click(removeButton);
		});

        // Expect the selected tag to no longer be in the document
        await waitFor(() => {
			const selectedTag = queryByText((content, element) => {
				return (
					element.tagName.toLowerCase() === "span" &&
					element.classList.contains("tag-text") &&
					content === "Aloe vera"
				);
			});

			expect(selectedTag).toBeNull();
		});
	});
});
