import { useState } from "react";

export default function RegisterPage() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  async function register(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/register`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }) 
    if(response.status === 200) {
      alert('registration successful');
    }
    else {
      alert('registration successful');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => SetUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => SetPassword(event.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
