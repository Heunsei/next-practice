import Link from "next/link";
import styles from "./page.module.css";
import executeQuery from "@/public/utils/database";

interface post {
  id: number;
  content: string;
  title: string;
}

export default async function List() {
  const query: string = "SELECT * FROM post";
  const data: post[] = await executeQuery(query);
  return (
    <div className={styles.bg}>
      {data.map((e, i) => {
        console.log(e);
        return (
          <div className={styles.card} key={i}>
            <div className={styles.top}>
              <Link href={`/detail/${e.id}`}>{e.title}</Link>
            </div>
            <div className={styles.bottom}>
              <p>{e.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
