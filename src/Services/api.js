import axios from "axios";

const API_URL = "http://54.221.119.164:5000";
const COVID_19_API_URL = "https://coronavirus-19-api.herokuapp.com/countries";

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
