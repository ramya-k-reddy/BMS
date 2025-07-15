import React, { useEffect } from "react";
import { GetCurrentUser } from "../../api/users";

function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      if (response.success) {
        console.log("Current User:", response.data);
      } else {
        console.error("Failed to fetch current user:", response.message);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <h1>Welcome to Book My Show</h1>
    </div>
  );
}

export default Home;
