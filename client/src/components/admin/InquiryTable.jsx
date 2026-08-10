import { Spinner } from '../ui/Spinner';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useInquiries } from '../../hooks/useInquiries';
import { updateInquiryStatus, deleteInquiry } from '../../services/api';
import { formatDate, truncate } from '../../utils/helpers';

export function InquiryTable() {
  const { inquiries, loading, refetch } = useInquiries();

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      refetch();
    } catch {
      // handle error
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      refetch();
    } catch {
      // handle error
    }
  };

  if (loading) return <Spinner size="lg" className="py-12" />;

  return (
    <div>
      <h3 className="text-white font-heading font-semibold text-lg mb-6">Inquiries ({inquiries.length})</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-muted">
              <th className="pb-3 pr-3">Date</th>
              <th className="pb-3 pr-3">Name</th>
              <th className="pb-3 pr-3">Email</th>
              <th className="pb-3 pr-3">Business</th>
              <th className="pb-3 pr-3">Source</th>
              <th className="pb-3 pr-3">Status</th>
              <th className="pb-3 pr-3">Message</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-3 text-muted whitespace-nowrap">{formatDate(inq.createdAt)}</td>
                <td className="py-3 pr-3 text-white">{inq.name}</td>
                <td className="py-3 pr-3 text-gray-300">{inq.email}</td>
                <td className="py-3 pr-3 text-gray-300">{inq.businessName || '—'}</td>
                <td className="py-3 pr-3"><Badge>{inq.source}</Badge></td>
                <td className="py-3 pr-3">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                    className="bg-brand border border-white/10 rounded-lg px-2 py-1 text-xs text-white cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-3 pr-3 text-muted max-w-[200px]" title={inq.message}>
                  {truncate(inq.message, 60)}
                </td>
                <td className="py-3">
                  <Button variant="danger" className="text-xs !px-3 !py-1" onClick={() => handleDelete(inq._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
