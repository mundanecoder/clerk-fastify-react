import React from "react";
import {
  RedirectToSignIn,
  SignOutButton,
  useClerk,
  useAuth,
} from "@clerk/clerk-react";
import axios from "axios";

const Home: React.FC = () => {
  const clerk = useClerk();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const url = "http://localhost:8000/user";

  // const [token, setToken] = React.useState<string | null>(null);

  async function handleClick() {
    if (!isSignedIn) {
      alert("Token is missing!");
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // React.useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await getToken();
  //     setToken(token);
  //   };
  //   fetchToken();
  // }, [getToken]);

  if (!clerk.user) {
    return <RedirectToSignIn />;
  }

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <SignOutButton />
      {<button onClick={handleClick}>Fetch User</button>}
    </div>
  );
};

export default Home;
