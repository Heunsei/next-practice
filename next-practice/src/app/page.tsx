import styles from "./page.module.css";
import LoginBtn from "./login/LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Home() {
  let session = await getServerSession(authOptions);
  console.log(session?.user?.name);
  if (session?.user?.name) {
    redirect("/list");
  }
  return (
    <div className={styles.page}>
      <LoginBtn />
    </div>
  );
}
