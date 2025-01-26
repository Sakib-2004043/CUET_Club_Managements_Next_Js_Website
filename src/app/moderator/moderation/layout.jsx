'use client'; // For React server components in Next.js 13+

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use `usePathname` to get the current path
import './layout.css'; // Import global CSS file

const ModeratorHeader = ({ children }) => {
  const pathname = usePathname(); // Get the current route path

  return (
    <div className="moderator-moderation-sub-layout">
      <nav className="moderator-moderation-nav">
        <Link 
          href="/moderator/moderation/announcements" 
          className={`moderation-link ${pathname === '/moderator/moderation/announcements' ? 'active' : ''}`}
        >
          Announcements 📢
        </Link>
        <Link 
          href="/moderator/moderation/clubMembers" 
          className={`moderation-link ${pathname === '/moderator/moderation/clubMembers' ? 'active' : ''}`}
        >
          Club Members 👥
        </Link>
        <Link 
          href="/moderator/moderation/approval" 
          className={`moderation-link ${pathname === '/moderator/moderation' ? 'active' : ''}`}
        >
          Approvals ✅
        </Link>
      </nav>
      <main className="moderation-content">
        {children}
      </main>
    </div>
  );
};

export default ModeratorHeader;
