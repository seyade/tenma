"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

type User = {
  username: string;
  name: string;
  email: string;
  userId: string;
  title: string;
  profileSummary: string;
  skills: string[];
  clients: string[];
  appTenure: string;
};

type UserContextType = {
  user: User | undefined;
  error: Error | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>({
  user: undefined,
  isLoading: true,
  error: null,
});

const userId = "55bf2c3f-eb8d-4b81-b54d-bdfe59eefe6a";

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
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
        );

        const { user } = await response.json();
        console.log(user);
        return user;
      } catch (error) {
        throw new Error(`ERROR_FETCHING_USERS: ${error}`);
      }
    },
  });

  return (
    <UserContext.Provider value={{ user, isLoading, error: error as Error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error("");
  return userContext;
};
