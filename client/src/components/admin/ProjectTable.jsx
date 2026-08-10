import { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Spinner } from '../ui/Spinner';
import { ProjectForm } from './ProjectForm';
import { deleteProject, toggleProjectVisibility } from '../../services/api';
import { useProjects } from '../../hooks/useProjects';
import { getApiImageUrl, truncate } from '../../utils/helpers';

export function ProjectTable() {
  const { projects, loading, refetch } = useProjects();
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      refetch();
    } catch {
      // handle error
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleProjectVisibility(id);
      refetch();
    } catch {
      // handle error
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    refetch();
  };

  if (showForm || editingProject) {
    return (
      <ProjectForm
        project={editingProject}
        onSuccess={handleFormSuccess}
        onCancel={() => { setShowForm(false); setEditingProject(null); }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-heading font-semibold text-lg">Projects ({projects.length})</h3>
        <Button onClick={() => setShowForm(true)}>Add New Project</Button>
      </div>

      {loading ? (
        <Spinner size="lg" className="py-12" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-muted">
                <th className="pb-3 pr-4">Thumbnail</th>
                <th className="pb-3 pr-4">Title</th>
                <th className="pb-3 pr-4">Industry</th>
                <th className="pb-3 pr-4">Case Study</th>
                <th className="pb-3 pr-4">Visible</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-b border-white/5 hover:bg-white/2">
                  <td className="py-3 pr-4">
                    <img src={getApiImageUrl(p.thumbnail)} alt={p.title} className="w-16 h-10 object-cover rounded-lg" />
                  </td>
                  <td className="py-3 pr-4 text-white font-medium">{truncate(p.title, 30)}</td>
                  <td className="py-3 pr-4"><Badge>{p.industry}</Badge></td>
                  <td className="py-3 pr-4">{p.isCaseStudy ? '✅' : '—'}</td>
                  <td className="py-3 pr-4">
                    <button onClick={() => handleToggle(p._id)} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${p.isVisible ? 'bg-success/20 text-success' : 'bg-white/10 text-muted'}`}>
                      {p.isVisible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-xs !px-3 !py-1" onClick={() => setEditingProject(p)}>Edit</Button>
                      <Button variant="danger" className="text-xs !px-3 !py-1" onClick={() => handleDelete(p._id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
