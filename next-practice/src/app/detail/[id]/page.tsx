import executeQuery from "@/public/utils/database";

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
  const data: post[] = await executeQuery(query);
  console.log(data);
  return (
    <div>
      <p>{props.params.id} 페이지입니당.</p>
      {data.map((e, i) => {
        return (
          <div key={i}>
            <p>{e.title}</p>
            <p>{e.content}</p>
          </div>
        );
      })}
    </div>
  );
}
