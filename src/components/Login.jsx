import React, { useState } from "react"
import PostUsername from "./user-components/PostUsername"
import PostPassword from "./user-components/PostPassword"


const Login = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [loginError, setLoginError] = useState("")

	async function login() {
        const userDetail = {
            username : username,
            password : password,
        }
            try {
            const putLogin= await fetch ("http://localhost:4001/users/login", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userDetail)
            })

            if (!putLogin.ok) {
                const errorData = await putLogin.json()
                setLoginError(errorData.error)            
            } else {
                const payload = await putLogin.json()
                sessionStorage.setItem("user_id", payload.token)
            }


        } catch (err) {
            console.log(err.message)
        }
        }

    return (
<>
    <section className="section">
        <div className="container">
            <div className="columns is-centered">       
                <div className="column is-half">
                    <h1 className="has-text-centered">Welcome back to Sproutly</h1>
                    <div className="field">
                        <label className="label">Username</label>
                        <PostUsername SetUsername={SetUsername} username={username} />
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <PostPassword SetPassword={SetPassword} password={password} />
                        {loginError && <p className="has-text-danger">{loginError}</p>}
                    </div>
                    <div className="columns is-centered mt-6">
                    <button className="button is-primary button is-medium" onClick={() => login(username)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
    )
}

export default Login