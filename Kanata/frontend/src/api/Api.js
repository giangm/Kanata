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

export const requestStart = async (name) => {
  return axios
    .get(`${API_BASE_URL}/start?name=${name}`)
    .then((response) => true)
    .catch((err) => false)
}

export const requestStop = async (name) => {
  return axios
    .get(`${API_BASE_URL}/stop?name=${name}`)
    .then((response) => true)
    .catch((err) => false)
}

export const requestFavourite = async (name, favourite) => {
  return axios
    .get(`${API_BASE_URL}/favourite?name=${name}&favourite=${favourite}`)
    .then((response) => true)
    .catch((err) => false)
}

export const requestComplete = async (name, complete) => {
  return axios
    .get(`${API_BASE_URL}/complete?name=${name}&complete=${complete}`)
    .then((response) => true)
    .catch((err) => false)
}