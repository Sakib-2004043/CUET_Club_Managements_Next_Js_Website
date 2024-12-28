import Link from 'next/link';
import './not-found.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="not-found-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
