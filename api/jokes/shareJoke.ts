import axios from "axios";

export const shareJoke = async (joke: string, emails: string[]) => {
  try {
    const { data } = await axios.post("/api/shareJoke", {
      joke,
      emails,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
