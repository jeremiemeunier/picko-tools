import { createContext, useContext, useState } from "react";
import {
  PickoAPIResponse,
  PickoClient,
  PickoContextProps,
  PickoDomain,
  PickoProviderProps,
} from "./PickoContext.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const PickoContext = createContext<PickoContextProps>({
  client: null,
  domain: null,
  data: null,
});

const PickoProvider: React.FC<PickoProviderProps> = ({ children }) => {
  const [client] = useState<PickoClient>(null);
  const [domain] = useState<PickoDomain>(null);
  const [data, setData] = useState<PickoAPIResponse | null>(null);

  const fetchData = useQuery({
    queryKey: ["picko", "stats", domain],
    queryFn: async () => {
      if (!domain)
        throw new Error(
          "You must provide a domain. For this find him on picko. For more information please read documentation at picko.jeremiemeunier.fr/docs"
        );

      if (!client)
        throw new Error(
          "You must provide a picko identification. For this find him on picko. For more information please read documentation at picko.jeremiemeunier.fr/docs"
        );

      try {
        const req = await axios.get(
          "https://picko.jeremiemeunier.fr/api/card/domain",
          {
            headers: {
              pickotoken: client,
            },
            params: {
              domain: domain,
            },
          }
        );

        setData(req.data);
        return req.data as PickoAPIResponse;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    retry: false,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  return (
    <PickoContext.Provider
      value={{
        client,
        domain,
        data,
      }}
    >
      {children}
    </PickoContext.Provider>
  );
};

export const usePickoClient = () => {
  const context = useContext(PickoContext);
  if (!context) {
    throw new Error("usePickoClient must be used within a PickoProvider");
  }
  return context;
};

export default PickoProvider;
