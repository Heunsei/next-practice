import executeQuery from "@/public/utils/database";
import Link from "next/link";
import React from "react";

interface propsType {
  params: { id: number };
}

interface post {
  id: number;
  content: string;
  title: string;
}

export default async function Detail(props: propsType) {
  console.log(props);
  const query = `SELECT * FROM post WHERE id=${props.params.id}`;
  const data: post[] = (await executeQuery(query)) as post[];
  console.log(data);

  return (
    <div>
      <p>{props.params.id} 페이지입니당.</p>
      {data.map((e, i) => {
        return (
          <div key={i}>
            <p>{e.title}</p>
            <p>{e.content}</p>
            <Link href={`/edit/${e.id}`}>수정</Link>
          </div>
        );
      })}
    </div>
  );
}
