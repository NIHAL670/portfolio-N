import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

export function useProjects(params = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await getProjects(params);
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(params)]);

  return { projects, loading, error, refetch: fetchProjects };
}
