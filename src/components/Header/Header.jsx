import styles from "./Header.module.css"
import Menu from "../../assets/menu.svg"
import Logo from "../../assets/logo.png"
import Folder from "../../assets/folder.svg"
import Square from "../../assets/square.svg"
import Power from "../../assets/power.svg"
import Circle from "../../assets/circle.svg"

const Header = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.container_nav}>
        <img className={styles.nav_menu} src={Menu} alt="Imagem Menu" />
        <img className={styles.nav_logo} src={Logo} alt="Logo Saibweb" />
      </nav>
      <div className={styles.container_center}>
        <div className={styles.center_sub}>
          <img className={styles.center_img} src={Folder} alt="Imagem Pasta" />
          <p className={styles.titles}>105 - SAIBWEB IMPLANTACAO</p>
        </div>
        <div className={styles.center_sub}>
          <img
            className={styles.center_img}
            src={Square}
            alt="Imagem Quadrado"
          />
          <p className={styles.titles}>VENDAS</p>
        </div>
      </div>
      <aside className={styles.container_aside}>
        <div className={styles.sub_aside}>
          <p className={styles.titles}>Bem Vindos(a): LUCASL.SAIBWEB</p>
          <span className={styles.titles_date}>17 de julho de 2024</span>
        </div>
        <button
          className={styles.aside_button}
          type="button"
          onClick={() => console.log("Clicando!")}
        >
          <img className={styles.button_power} src={Power} alt="Logo SaibWeb" />
          <img
            className={styles.button_circles}
            src={Circle}
            alt="Logo SaibWeb"
          />
        </button>
      </aside>
    </div>
  )
}

export default Header
