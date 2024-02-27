import "@testing-library/jest-dom"
import { render} from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PostTag from "../components/post-components/PostTag"


const mockPost = [
    {
        "_id": "65d52727f8f2d25e2d002988",
        "user": {
          "_id": "65d469278aaa81f8f6af8499",
          "username": "BobMarley",
          "password": "$2b$10$a1iWP4kczvh9aj6/uIN9J.yVP/Lwfuh2E58bUF9y19gU0uaVMWMMm",
          "plants": [
            "ZZ plant"
          ],
          "profilePicture": "https://images.ctfassets.net/sfnkq8lmu5d7/3g9BQo5pU4OOvi6nNugN4n/552676f869d72f164ed20302995fb93c/2021_03-catSafePlants-AdobeStock_314908743.jpg?w=1000&h=750&q=70&fm=webp",
          "__v": 0
        },
        "title": "Do these plants all go together?",
        "content": "Help I have a few plants - do they all go?!",
        "image": "",
        "parentID": null,
        "isThreadStarter": false,
        "isComment": false,
        "tags": [
          "Boston fern",
          "Fiddle leaf fig",
          "Calathea",
          "Maidenhair fern"
        ],
        "reactions": [],
        "createdDateTime": "2024-02-20T22:26:47.071Z",
        "__v": 0
      }
  ]

describe('PostTag Component', () => {
  let document

    document = render(
    <PostTag post={mockPost[0]} /> ).container


  it('renders the post tags', () => {
    expect(document.querySelector("div")).toHaveTextContent("Boston fern")
    expect(document.querySelector("div")).toHaveTextContent("Fiddle leaf fig")
    expect(document.querySelector("div")).toHaveTextContent("Calathea")
    expect(document.querySelector("div")).toHaveTextContent( "Maidenhair fern")
  })
})