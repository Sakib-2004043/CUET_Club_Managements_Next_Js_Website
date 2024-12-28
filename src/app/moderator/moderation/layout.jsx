'use client'; // For React server components in Next.js 13+

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use `usePathname` to get the current path
import './layout.css'; // Import global CSS file

const ModeratorHeader = ({children}) => {
  const pathname = usePathname(); // Get the current route path

  return (
    <div className="sub-layout">
      <nav className="nav">
      <Link href="/moderator/moderation" className='link'>
        Details
      </Link>
      <Link href="/moderator/moderation/announcements" className='link'>
        Announcements
      </Link>
      <Link href="/moderator/moderation/clubMembers" className='link'>
        Club Members
      </Link>
      <Link href="/moderator/moderation" className= 'link'>
        Approvals
      </Link>
    </nav>
      <main className="user-content">
        {children}
      </main>
    </div>
  );
};

export default ModeratorHeader;
