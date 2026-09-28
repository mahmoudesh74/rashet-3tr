import styles from './NavBar.module.css';
import LogoImge from '../../assets/logo-rashet-3tr.png';
const links = [
  { label: 'الرئيسية', href: '#', active: true },
  { label: 'عن رشة عطر', href: '#' },
  { label: 'الاكثر مبيعا', href: '#' },
  { label: 'العطور', href: '#' },
  { label: 'المقالات', href: '#' },
  { label: 'تواصل معنا', href: '#' },
];

export default function Navbar() {
  return (
    <nav dir="rtl" className={styles.navbar}>
      <div className={styles.container}>
     
       
        < img src={LogoImge} alt="Logo" style={{ height: 100,width:150 }} />
 

        {/* Links */}
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.link} ${link.active ? styles.linkActive : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className={styles.icons}>
          <button aria-label="بحث" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button aria-label="حسابي" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>
          <button aria-label="السلة" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 4 3H2" />
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}