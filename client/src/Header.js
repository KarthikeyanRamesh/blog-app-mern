import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVERURL}/profile`, {
            credentials: 'same-origin'
        }).then(response => {
            response.json().then(user => {
                setUserInfo(user);
            });
        });
    }, []);

    function logout() {
        fetch(`${process.env.REACT_APP_SERVERURL}/logout`, {
            credentials: 'same-origin',
            method: 'POST'
        })
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <Link to='/create'>Create new post</Link>
                        <Link onClick={logout}>logout</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                
            </nav>
      </header>
    )
}