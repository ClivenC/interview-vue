import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

class BeneficiaryService {
  getBeneficiaries(token) {
    return axios
      .get(`${API_URL}beneficiaries/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  }

  searchBeneficiaries(query, token) {
    return axios
      .get(`${API_URL}beneficiaries/?search=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data);
  }

  createBeneficiary(data, token) {
    return axios.post(`${API_URL}beneficiaries/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createRandomBeneficiary(token) {
    return axios.post(
      `${API_URL}beneficiaries/create_random/`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  deleteBeneficiary(id, token) {
    return axios.delete(`${API_URL}beneficiaries/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateBeneficiary(id, data, token) {
    return axios.put(`${API_URL}beneficiaries/${id}/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new BeneficiaryService();
