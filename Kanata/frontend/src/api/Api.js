import axios from 'axios'
import { API_BASE_URL } from '@/constants/Constants'

export const fetchList = async () => {
  return axios
    .get(`${API_BASE_URL}/list`)
    .then((response) => response.data["data"])
    .catch((err) => {})
}

export const fetchInformation = async (name) => {
  return axios
    .get(`${API_BASE_URL}/information?name=${name}`)
    .then((response) => response.data["data"])
    .catch((err) => {})
}

export const requestStop = async (name) => {
  return axios
    .get(`${API_BASE_URL}/stop?name=${name}`)
    .then((response) => response)
    .caatch((err) => {})
}