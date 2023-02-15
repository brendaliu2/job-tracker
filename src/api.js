import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/** API Class */

class TrackerApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get all companies */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res;
  }

  /** Add new company */
  static async addCompany(handle, link) {
    const body = {
      name:handle,
      link: link
    }
    let res = await this.request('companies', body, 'post');
    return res;
  }

  /** Update last visited for a company */
  static async editCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'patch');
    return res;
  }

}

export default TrackerApi;