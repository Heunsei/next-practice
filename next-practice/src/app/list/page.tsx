import styles from "./page.module.css";
import ListItem from "./ListItem";
import getPost from "@/public/utils/getPost";
import { auth } from "../../../auth";
export const dynamic = "force-dynamic";

interface post {
  id: number;
  content: string;
  title: string;
}

export default async function List() {
  const query: string = "SELECT * FROM post";
  const data = (await getPost(query)) as post[];
  const session = await auth();
  console.log(session);
  return (
    <div className={styles.bg}>
      <ListItem data={data} />
    </div>
  );
}
