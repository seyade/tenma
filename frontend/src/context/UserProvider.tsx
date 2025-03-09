import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext(undefined);

const userId = "7f214693-64ca-4019-b3c0-13ee9d587622";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/users/${userId}`,
          { credentials: "include" }
        );

        const user = await response.json();
        return user;
      } catch (error) {
        throw new Error(`ERROR_FETCHING_USERS: ${error}`);
      }
    },
  });

  return (
    <UserContext.Provider
      value={{ user, isLoading, error: error as Error | undefined }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
