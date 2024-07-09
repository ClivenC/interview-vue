import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

class BeneficiaryService {
  async getBeneficiaries(token) {
    const response = await axios.get(`${API_URL}/beneficiaries/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async searchBeneficiaries(query, token) {
    const response = await axios.get(
      `${API_URL}/beneficiaries/?search=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  async deleteBeneficiary(id, token) {
    const response = await axios.delete(`${API_URL}/beneficiaries/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async updateBeneficiary(id, data, token) {
    const response = await axios.put(`${API_URL}/beneficiaries/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async createRandomBeneficiary(token) {
    const response = await axios.post(
      `${API_URL}/beneficiaries/create_random/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
}

export default new BeneficiaryService();
