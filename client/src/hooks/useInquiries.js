import { useState, useEffect } from 'react';
import { getInquiries } from '../services/api';

export function useInquiries(params = {}) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data } = await getInquiries(params);
      setInquiries(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [JSON.stringify(params)]);

  return { inquiries, loading, error, refetch: fetchInquiries };
}
