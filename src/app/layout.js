import Link from 'next/link';
import "./layout.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <footer className="footer">
          <nav className="footer-nav">
            <Link href="/" className="footer-link">
              Home
            </Link>
            <Link href="/login" className="footer-link">
              Login
            </Link>
            <Link href="/register" className="footer-link">
              Signup
            </Link>
          </nav>
        </footer>
        {children}
      </body>
    </html>
  );
}
