import { useState } from "react";

function Auth({ auth, setAuth }) {

  return (

    <div className="auth">

      <h3>Authorization</h3>

      <select
        value={auth.type}
        onChange={(e) =>
          setAuth({
            ...auth,
            type: e.target.value
          })
        }
      >

        <option value="none">
          No Auth
        </option>

        <option value="bearer">
          Bearer Token
        </option>

        <option value="basic">
          Basic Auth
        </option>

        <option value="apikey">
          API Key
        </option>

      </select>

      {auth.type === "bearer" && (

        <input
          type="text"
          placeholder="Enter token"
          value={auth.token}
          onChange={(e) =>
            setAuth({
              ...auth,
              token: e.target.value
            })
          }
        />

      )}

    </div>

  );
}

export default Auth;