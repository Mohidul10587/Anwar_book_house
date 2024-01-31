import { useState, useEffect, useContext } from "react";
import url from "../../url";

const useCurrentUser = (token) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const token2 = isLocalStorageAvailable
    ? localStorage.getItem("accessToken")
    : null;
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Replace with your actual auth token

        const response = await fetch(`${url}/api/v1/sellers/current_seller`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch current seller");
        }

        const sellerData = await response.json();

        setCurrentUser(sellerData.data.sellerId);
        setCurrentUserName(sellerData.data.name);

        console.log("this is data .....", sellerData.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    console.log("first");
    fetchCurrentUser();
  }, [token, token2]);

  return { currentUser, currentUserName, loading, error };
};

export default useCurrentUser;
