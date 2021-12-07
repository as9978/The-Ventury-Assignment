import axios from "axios";
import { useQuery } from "react-query";

export const getJoke = () =>
  useQuery<IResponse>("joke", async () => {
    try {
      const { data } = await axios.get<IResponse>(
        "http://api.icndb.com/jokes/random"
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  });
