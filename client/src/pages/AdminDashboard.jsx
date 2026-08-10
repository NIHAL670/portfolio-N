import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ProjectTable } from '../components/admin/ProjectTable';
import { InquiryTable } from '../components/admin/InquiryTable';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiMail, FiFileText, FiLogOut } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const { user } = useAuth();

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <FiGrid /> },
    { id: 'inquiries', label: 'Inquiries', icon: <FiMail /> },
    { id: 'blog', label: 'Blog Posts', icon: <FiFileText /> },
  ];

  return (
    <PageWrapper title="Admin Dashboard">
      <div className="min-h-screen bg-brand flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-dark border-r border-white/5 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-muted text-xs">{user?.email || ''}</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <a
            href={`${API_URL}/auth/logout`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted hover:text-danger hover:bg-danger/5 transition-colors mt-4"
          >
            <FiLogOut />
            Logout
          </a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'projects' && <ProjectTable />}
          {activeTab === 'inquiries' && <InquiryTable />}
          {activeTab === 'blog' && (
            <div className="text-center text-muted py-20">
              <p>Blog management coming soon. Use API directly for now.</p>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
}
