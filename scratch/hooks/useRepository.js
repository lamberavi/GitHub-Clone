import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api/axios';

export default function useRepository(repoId) {
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!repoId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/repositories/${repoId}`);
      setRepo(res.data.repository);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load repository details.');
    } finally {
      setLoading(false);
    }
  }, [repoId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    repo,
    loading,
    error,
    refresh: fetchDetails
  };
}
