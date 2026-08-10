import { personalInfo } from './data';
import { FiLinkedin, FiGithub, FiCode, FiBox } from 'react-icons/fi';

const socialLinks = [
  { key: 'linkedin', Icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'github', Icon: FiGithub, label: 'GitHub' },
  { key: 'huggingface', Icon: FiBox, label: 'HuggingFace' },
  { key: 'leetcode', Icon: FiCode, label: 'LeetCode' },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex gap-4 mb-6">
          {socialLinks.map(({ key, Icon, label }) => (
            <a
              key={key}
              href={personalInfo.socials?.[key] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <div className="text-muted text-sm">
          © 2026 Nihal Yadav. Built with React & TailwindCSS.
        </div>
      </div>
    </footer>
  );
}
