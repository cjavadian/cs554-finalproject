import React from "react";

const Welcome = ({user,onSignOut}) => {
    return (
        <div>Welcome {user.username}
        <button onClick={onSignOut}>SignOut
        </button>
        </div>
    )
}

export default Welcome;