import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImageUpload from "../components/ImageUpload";

describe("Image Upload component", () => {
	it("Renders the component to upload image", () => {
		const { getByText } = render(<ImageUpload />);
		expect(getByText("Choose image")).toBeInTheDocument();
	});

	it("Update the filestate when a file is uploaded", () => {
		const { getByText } = render(<ImageUpload />);
		const fileInput = getByText("Choose image");
		const file = new File([], "test.jpg");

		act(() => {
			fireEvent.change(fileInput, { target: { files: [file] } });
		});

		expect(fileInput.files[0]).toBeDefined();
		expect(fileInput.files[0].name).toBe("test.jpg");
	});
});
