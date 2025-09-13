import styles from "./Header.module.css";

interface HeaderProps {
  setCreate: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setCreate }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headeTtitle}>Superheroes</h1>
      <button
        className={styles.create}
        onClick={() => {
          setCreate(true);
        }}
      >
        Create Hero
      </button>
    </header>
  );
};

export default Header;
