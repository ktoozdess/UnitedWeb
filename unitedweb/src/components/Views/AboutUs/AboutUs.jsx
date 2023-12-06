import styles from './AboutUs.module.scss'
import { useEffect } from 'react';
import logoUnited from '../../../assets/logoUnited.png'


const AboutUs = () =>{
    useEffect(() =>{
        const userTheme = localStorage.getItem("theme")
        const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
        const ThemeCheck = () =>{
        if (userTheme === "dark" || (!userTheme && systemTheme)){
            document.documentElement.classList.add("dark")
            return
        }
        }
  ThemeCheck()
    }, [])
    return(
        <>
        <div class="animate__animated animate__fadeInDown">
            <div className={styles.header}>
                <a href="/">
                    <img src={logoUnited} alt="" width="180px" />
                </a>
            </div>
        </div>
        <div className={styles.wrapper}>
            <p class="animate__animated animate__fadeIn"><p className={styles.one_liner}>United is a platform for finding people for business, co-work, co-project, hobby</p></p>
            <div className={styles.example}>
                <p class="animate__animated animate__fadeIn"><p className={styles.example_p}>Example</p></p>
                <p class="animate__animated animate__fadeInUp"><p className={styles.example_p_text}>You have a startup idea, you frontend engineer and you need person who
                    can write backend code and designer. <br /> United can fix this problem, you can find people which you want</p></p>
            </div>

            <p class="animate__animated animate__fadeInUpBig"><p className={styles.mission} >Our mission is to unite</p></p>
        </div>
        </>
    )
}

export default AboutUs