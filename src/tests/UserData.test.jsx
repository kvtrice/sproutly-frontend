import "@testing-library/jest-dom"
import { render} from "@testing-library/react"
import { describe, expect, it } from "vitest"
import UserData from "../components/user-components/Userdata"


const mockUsers = [
    {
		"_id": "65d80f2133e39702e8a000d9",
		"username": "NEWTESTALICE",
		"password": "$2b$10$O99DPbXYYA7Fwlc5fuse7ODHF2jkKABYshNe/srraqUYzAVWUabey",
		"plants": [
			"Aloe vera",
			"Birds nest fern"
		],
		"profilePicture": "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp",
		"__v": 0
	},
	{
		"_id": "65d80ff0731eff981919075a",
		"username": "TESTTEST",
		"password": "$2b$10$/235AUCxApnsx5ABMcDkk.quzPN37TBxEQxdS4woo1ywWBXDWehKm",
		"plants": [
			"Monstera"
		],
		"profilePicture": "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp",
		"__v": 0
	}
]

const mockUser_ID = "65d80ff0731eff981919075a"

describe('UserData Component', () => {
  let document

    document = render(
    //have to pass the index of the single post object for it to render properly
    <UserData users={mockUsers} user_id={mockUser_ID} /> ).container


  it('renders that specific user components', () => {
    expect(document.querySelector("h3")).toHaveTextContent( "TESTTEST")
    const imageElement = document.querySelector("img")
    expect(imageElement).toHaveAttribute("src", "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp")

  })
})