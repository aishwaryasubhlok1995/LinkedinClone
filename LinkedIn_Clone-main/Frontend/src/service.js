import axios from "axios";

const apiUrl = "http://localhost:3001";

class Service {
  get(endpoint, options = null) {
    const url = `${apiUrl}/${endpoint}`;

    return axios.get(url, options);
  }

  post(
    endpoint = "",
    data = {},
    options = { headers: { "Content-Type": "application/json" } }
  ) {
    const url = `${apiUrl}/${endpoint}`;
    return axios.post(url, data, options);
  }
}

export default Service;
