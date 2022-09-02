import axios from "axios";

export const getData = async (url) => {
  try {
    const response = await axios.get(url);

    const result = response.status === 200 ? response.data : null;
    return result;
  } catch (err) {
    return null;
  }
};
