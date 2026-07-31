import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import repositoryService from '../services/repositoryService';
import api from '../lib/api/axios';
import { 
  updateRepository as updateAction, 
  deleteRepository as deleteAction 
} from '../lib/redux/slices/repoSlice';
import toast from 'react-hot-toast';

export default function useRepositories() {
  const dispatch = useDispatch();
  const { repositories, loading, error } = useSelector((state) => state.repos);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateSettings = useCallback(async (id, data) => {
    setIsProcessing(true);
    try {
      const updated = await repositoryService.updateRepositorySettings(id, data);
      dispatch(updateAction(updated));
      toast.success('Repository updated successfully.');
      return updated;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update repository.';
      toast.error(msg);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch]);

  const fetchRepositories = useCallback(async (username, force = false) => {
    setIsProcessing(true);
    try {
      const res = await api.get(`/api/profile/${username}/repos`);
      dispatch({ type: 'repos/setRepositories', payload: res.data.repositories });
      return res.data.repositories;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch repositories.';
      dispatch({ type: 'repos/setError', payload: msg });
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch]);

  const removeRepo = useCallback(async (id) => {
    setIsProcessing(true);
    try {
      const res = await repositoryService.deleteRepository(id);
      dispatch(deleteAction(id));
      toast.success('Repository deleted successfully.');
      return res;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete repository.';
      toast.error(msg);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch]);

  return {
    repositories,
    loading,
    error,
    isProcessing,
    updateSettings,
    removeRepo,
    fetchRepositories
  };
}

