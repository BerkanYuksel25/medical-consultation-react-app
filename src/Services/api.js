import axios from "axios";

const API_URL = "http://54.221.119.164:5000";

export async function getCovidLikelihoodPercentage(data) {
  try {
    return Math.round(
      (await (await axios.post(`${API_URL}/prediction`, data)).data
        .prediction) * 100
    );
  } catch (error) {
    return error;
  }
}
