export default function Write() {
  return (
    <div className="p-20">
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="제목"></input>
        <input name="content" placeholder="내용"></input>
        <button type="submit">btn</button>
      </form>
    </div>
  );
}
