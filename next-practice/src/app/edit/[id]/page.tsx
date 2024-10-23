import executeQuery from "@/public/utils/database";

interface propsType {
  params: { id: number };
}

interface post {
  id: number;
  content: string;
  title: string;
}

export default async function Edit(props: propsType) {
  const id = props.params.id;
  const detail_query = `SELECT * FROM post WHERE id=${props.params.id}`;
  const data: post[] = await executeQuery(detail_query);
  return (
    <div>
      <form action={`/api/post/edit/${id}`} method="post">
        <input type="text" name="title" defaultValue={data[0].title} />
        <input type="text" name="content" defaultValue={data[0].content} />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
