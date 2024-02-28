import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import { describe, expect, it} from "vitest";
import ImageUpload from "../components/ImageUpload";

describe("Image Upload component", () => {
	it("Renders the component to upload image", () => {
        // Render the component
		const { getByText } = render(<ImageUpload />);
        
        // Confirm it's rendered based on 'Choose image' text
		expect(getByText("Choose image")).toBeInTheDocument();
	});

	it("Update the filestate when a file is uploaded", () => {
        // Render component
		const { getByText } = render(<ImageUpload />);

        // Target the file input button
		const fileInput = getByText("Choose image");

        // Set a dummy file
		const file = new File([], "test.jpg");

        // Simulate a user clicking the Choose image button adn selecting the dummy file
		act(() => {
			fireEvent.change(fileInput, { target: { files: [file] } });
		});

        // Checking the dummy file is successfully selected and update the filestate
		expect(fileInput.files[0]).toBeDefined();
		expect(fileInput.files[0].name).toBe("test.jpg");
	});
});
