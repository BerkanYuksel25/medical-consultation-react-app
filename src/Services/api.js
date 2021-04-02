import axios from "axios";

const API_URL = "http://54.221.119.164:5000";

export async function getPredictions(data) {
  try {
    return await axios.post(`${API_URL}/prediction`, data).data;
  } catch (error) {
    return error;
  }
}
