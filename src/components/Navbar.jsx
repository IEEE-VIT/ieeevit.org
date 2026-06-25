import { useState } from 'react';

export default function Navbar({ theme, setTheme, currentPath, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getThemeSrc = (src) => {
    if (theme === 'dark') {
      return src.replace('_light', '_dark').replace('-light', '-dark');
    } else {
      return src.replace('_dark', '_light').replace('-dark', '-light');
    }
  };

  const handleNavClick = (e, path, hash) => {
    setIsMenuOpen(false);
    if (path === '/') {
      if (currentPath === '/alumni' || currentPath === '/alumni.html') {
        e.preventDefault();
        onNavigate('/');
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash.substring(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (hash) {
          e.preventDefault();
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      e.preventDefault();
      onNavigate('/alumni');
      window.scrollTo({ top: 0 });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="navbar">
      <div className="hamburger-menu" onClick={() => setIsMenuOpen(true)}>
        <img src="/images/hamburger.svg" alt="Hamburger Icon" />
      </div>

      <ul className={`menu ${isMenuOpen ? 'open' : 'close'}`}>
        <img
          src="/images/cross.svg"
          alt="Close"
          className="cross"
          onClick={() => setIsMenuOpen(false)}
        />

        <li className="menu_options">
          <a href="/" onClick={(e) => handleNavClick(e, '/', null)}>
            Home
          </a>
        </li>
        <li className="menu_options">
          <a href="#about" onClick={(e) => handleNavClick(e, '/', '#about')}>
            About Us
          </a>
        </li>
        <li className="menu_options">
          <a href="#techloop" onClick={(e) => handleNavClick(e, '/', '#techloop')}>
            TechLoop
          </a>
        </li>
        <li className="menu_options">
          <a href="#events" onClick={(e) => handleNavClick(e, '/', '#events')}>
            Events
          </a>
        </li>
        <li className="menu_options">
          <a href="#blogs" onClick={(e) => handleNavClick(e, '/', '#blogs')}>
            Blogs
          </a>
        </li>
        <li className="menu_options">
          <a href="#podcast" onClick={(e) => handleNavClick(e, '/', '#podcast')}>
            Podcast
          </a>
        </li>
        <li className="menu_options">
          <a href="/alumni" onClick={(e) => handleNavClick(e, '/alumni', null)}>
            Alumni
          </a>
        </li>
      </ul>

      <ul className="socials">
        <a
          href="https://www.facebook.com/IEEEVIT/"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/facebook_light.svg')}
            alt="Facebook Icon"
          />
        </a>
        <a
          href="https://www.instagram.com/ieeevitvellore/"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/instagram_light.svg')}
            alt="Instagram Icon"
          />
        </a>
        <a
          href="https://twitter.com/ieeevitvellore"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/twitter_light.svg')}
            alt="Twitter Icon"
          />
        </a>
        <a
          href="https://github.com/ieee-vit"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/github_light.svg')}
            alt="Github Icon"
          />
        </a>
        <a
          href="https://www.linkedin.com/company/ieee-vit-vellore/"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/linkedin_light.svg')}
            alt="Linkedin Icon"
          />
        </a>
        <a
          href="mailto:contact@ieeevit.org"
          className="social_icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="icon"
            src={getThemeSrc('/images/email_light.svg')}
            alt="Email Icon"
          />
        </a>
        <li id="change-theme" onClick={toggleTheme}>
          <img
            className="icon"
            src={getThemeSrc('/images/change_theme_light.svg')}
            alt="Change Theme"
          />
        </li>
      </ul>
    </nav>
  );
}
