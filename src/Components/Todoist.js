import React from "react";



const redirectToAuthorization = () =>{
    const url = "https://todoist.com/oauth/authorize"
    const client_id = "b66cc0ad5d5440e3b7398f761447d423"
    const scope = "task:add,data:read_write"
    const state = "applepietasty"
    const redirectURI = 'http://localhost:3000/auth/callback';
    const authorizationURL = `${url}?client_id=${client_id}&scope=${scope}&state=${state}&redirect_uri=${redirectURI}`;
    window.location.href = authorizationURL
}





export default function Todoist(){
    return (
        <div>
            <h1>Authorize Todoist Access</h1>
            <button onClick={redirectToAuthorization}>Authorize</button>
        </div>
    )
}