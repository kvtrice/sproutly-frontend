import "@testing-library/jest-dom"
import { render} from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PostText from "../components/post-components/PostText"


const mockPost = [
    {
        "_id": "65d469278aaa81f8f6af849d",
        "user": {
          "_id": "65d469278aaa81f8f6af8497",
          "username": "Lumi3",
          "password": "$2b$10$a1iWP4kczvh9aj6/uIN9J.yVP/Lwfuh2E58bUF9y19gU0uaVMWMMm",
          "plants": [
            ""
          ],
          "profilePicture": "https://cdn.shopify.com/s/files/1/0997/4496/articles/shutterstock_597959525_07dcd775-31fc-4a78-b42a-4fffa0febd35.jpg?v=1588963145",
          "__v": 0
        },
        "title": "How can I save this leaf?",
        "content": "I don't understand why it's dying - help!!",
        "image": "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg",
        "parentID": null,
        "isThreadStarter": false,
        "isComment": true,
        "tags": [
          "Monstera"
        ],
        "reactions": [
          "65d469278aaa81f8f6af8498",
          "65d469278aaa81f8f6af8499"
        ],
        "createdDateTime": "2024-02-20T08:56:07.925Z",
        "__v": 0
      }
]

describe('PostText Component', () => {
  let document

    document = render(
    //have to pass the index of the single post object for it to render properly
    <PostText post={mockPost[0]} /> ).container


  it('renders the post content', () => {
    console.log(document.innerHTML)
    expect(document.querySelector("div")).toHaveTextContent("Monstera")
  })
})