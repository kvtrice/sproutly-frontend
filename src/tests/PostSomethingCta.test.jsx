import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostSomethingCta from "../components/PostSomethingCta";
import { BrowserRouter } from "react-router-dom";

describe("PostSomethingCta component", () => {
	it("Renders the Post Something component", () => {
		const loggedInUserPictureUrl =
			"https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp";
		const { getByPlaceholderText } = render(
			<BrowserRouter>
				<PostSomethingCta
					loggedInUserPictureUrl={loggedInUserPictureUrl}
				/>
			</BrowserRouter>
		);

		expect(getByPlaceholderText("Post something...")).toBeInTheDocument();
	});

	it("Navigates to /post/new when the input is clicked"),
		() => {
			const loggedInUserPictureUrl =
				"https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp";
			const { getByPlaceholderText } = render(
				<BrowserRouter>
					<PostSomethingCta
						loggedInUserPictureUrl={loggedInUserPictureUrl}
					/>
				</BrowserRouter>
			);

			const inputElement = getByPlaceholderText("Post something...");
			fireEvent.click(inputElement);

			expect(window.location.pathname).toBe("/post/new");
		};
});
