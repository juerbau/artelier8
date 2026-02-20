import Image from "next/image";
import styles from "./page.module.css";
import test from "@/ui/images/output.ico"
import newart from "@/ui/images/newArt.png";
import creative from "@/ui/images/creative.png";
import bild1 from "@/ui/images/Bild4.png";
import beste from "@/ui/images/beste.png";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div className={styles.logo}>
              <div style={{height: "50px"}}></div>
              <Image
              src={newart}
              alt="Logo"
              width={653}   // Original-Seitenverhältnis
              height={167}
              style={{ width: "150px", height: "auto", display: "block"}}
              priority
          />
              <div style={{height: "50px"}}></div>
              <Image
                  src={bild1}
                  alt="Logo"
                  width={653}   // Original-Seitenverhältnis
                  height={167}
                  style={{ width: "150px", height: "auto", display: "block" }}
                  priority
              />
              <div style={{height: "50px"}}></div>
              <Image
                  src={creative}
                  alt="Logo"
                  width={653}   // Original-Seitenverhältnis
                  height={167}
                  style={{ width: "150px", height: "auto", display: "block" }}
                  priority
              />
              <div style={{height: "50px"}}></div>
              <Image
                  src={beste}
                  alt="Logo"
                  width={653}   // Original-Seitenverhältnis
                  height={167}
                  style={{ width: "150px", height: "auto", display: "block" }}
                  priority
              />
          </div>
      </main>
    </div>
  );
}
