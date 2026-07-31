import api from '../lib/api/axios';

export const getRepository = async (id) => {
  const res = await api.get(`/api/repositories/${id}`);
  return res.data.repository;
};

export const updateRepositorySettings = async (id, data) => {
  const res = await api.put(`/api/repositories/${id}`, data);
  return res.data.repository;
};

export const deleteRepository = async (id) => {
  const res = await api.delete(`/api/repositories/${id}`);
  return res.data;
};

export default {
  getRepository,
  updateRepositorySettings,
  deleteRepository
};
