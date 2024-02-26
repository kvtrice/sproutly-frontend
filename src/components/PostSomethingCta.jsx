import React from 'react'
import './PostSomethingCta.css'
import { useNavigate } from 'react-router-dom'

const PostSomethingCta = () => {

    const nav = useNavigate()
    const authenticatedUserProfilePicture = "https://res.cloudinary.com/djtgmjm16/image/upload/v1708403153/samples/woman-on-a-football-field.jpg"

    const handleNavToCreatePost = () => {
        nav('/post/new')
    }

  return (
    <div className="post-something-wrapper">
        <div className="post-something-container component-wrapper">
            <div className='profile-picture'>
                <img className="user-profile-picture" src={authenticatedUserProfilePicture} />
            </div>
            <div className='post-something-input'>
                <input className='input' type="text"  placeholder='Post something...' onClick={handleNavToCreatePost}/>
            </div>
        </div>
    </div>
  )
}

export default PostSomethingCta