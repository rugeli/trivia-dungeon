import { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});
// default val for auth

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
      console.log(user);
      const createUser = "https://trivia-dungeon-backend.herokuapp.com/users";
      const postUser = {
        netlify_id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
      };
      axios
        .post(
          `${createUser}`,
          {
            postUser,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((data) => console.log("data", JSON.stringify(data)))
        .catch((error) => console.log("error", JSON.stringify(error), error));
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    netlifyIdentity.on("init", () => {
      setUser(user)
      setAuthReady(true)
      console.log("init event")
    })

    // init netlify identify connection
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
