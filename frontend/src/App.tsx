import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { fetchLoggedInUser } from "./helper/apiCalls";
import { IUser } from "./model/user";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectRoute from "./utils/ProtectRoute";

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [signUpModalFlag, setSignUpModalFlag] = useState(false);
  const [loginModalFlag, setLoginModalFlag] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await fetchLoggedInUser();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar 
          loggedInuser={user}
          onLoginClicked={() => {
            setLoginModalFlag(true);
          }}
          onSignUpClicked={() => {
            setSignUpModalFlag(true);
          }}
          onLogoutSuccessfull={() => {
            setUser(null);
          }}
        />

        <Routes>
          <Route path="/" element={<ProtectRoute user={user} />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

        {signUpModalFlag && (
          <SignUpModal
            onClose={() => setSignUpModalFlag(false)}
            onSuccessfullSignup={(user) => {
              setUser(user);
              setSignUpModalFlag(false);
            }}
          />
        )}
        {loginModalFlag && (
          <LoginModal
            onClose={() => setLoginModalFlag(false)}
            onLoginSuccessfull={(user) => {
              setUser(user);
              setLoginModalFlag(false);
            }}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
