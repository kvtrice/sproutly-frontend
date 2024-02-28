import { render, screen,fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"
import SortFilter from "../components/post-components/SortFilter"

describe("SortFilter component", () => {
  it("renders correctly with 'Newest to Oldest' button ", () => {

    const mockPosts = [
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
      },

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


    const mockSetPosts = () => {}

    render(<SortFilter posts={mockPosts} setPosts={mockSetPosts} />)
    expect(screen.getByText("Newest to Oldest")).toBeDefined()

  })
})

describe("SortFilter component", () => {
  it("Changes the order of setPosts when sorting button is clicked", () => {

    const mockPosts = [
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
      },

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

    // variable that keeps track of how mnay times the mockSetPost is called. It is called twice since the sortOrder is asceding and then a 
    //second time when we filtered from Newest to Older
    let callCount = 0
    // this allowed us to store the value of MockSetPost during the sorting
    let calledWith = null
    
    const mockSetPosts = (...args) => {
      callCount++
      calledWith = args
    }
    
    render(<SortFilter posts={mockPosts} setPosts={mockSetPosts} sortOrder="ascending" />)
    const sortingButton = screen.getByText("Newest to Oldest")
    fireEvent.click(sortingButton)
    

    expect(callCount).toBe(2)
    expect(calledWith).toEqual([[

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
      },
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
    ]])
    
  })
})