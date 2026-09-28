import styles from './NavBar.module.css';
import LogoImage from "../../assets/logo-rashet-3tr.png";
import SearchIcon from "../../assets/search.svg";
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
     
      
         <img src={LogoImage} alt="LogoImage" className={styles.logoImage} />
        

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
         <div className={styles.searchIcon}>
          <img src={SearchIcon} alt="بحث" />

         </div>
        <div className={styles.profileIcon}>
          <img src={SearchIcon} alt="بحث" />

         </div>
        <div className={styles.cartIcon}>
          <img src={SearchIcon} alt="بحث" />

         </div>
        </div>
      </div>
    </nav>
  );
}