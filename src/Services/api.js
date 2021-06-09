import axios from "axios";

// Add relevant backend URLs here
const API_URL = "";
const COVID_19_API_URL = "";

export async function getCovidLikelihood(data) {
  try {
    return Math.round(
      (await (await axios.post(`${API_URL}/prediction`, data)).data
        .prediction) * 100
    );
  } catch (error) {
    return error;
  }
}

export async function getCovidTodayCasesByCountry(countryName) {
  try {
    return await (await axios.get(`${COVID_19_API_URL}/${countryName}`)).data
      .todayCases;
  } catch (error) {
    return error;
  }
}
