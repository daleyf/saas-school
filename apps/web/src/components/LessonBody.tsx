export function LessonBody({ markdown }: { markdown: string }) {
  const blocks = markdown.split("\n\n").filter(Boolean);
  return (
    <div className="lesson-body">
      {blocks.map((block, index) => {
        if (block.startsWith("# ")) {
          return <h1 key={index}>{block.replace("# ", "")}</h1>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={index}>{block.replace("## ", "")}</h2>;
        }
        if (block.startsWith("- ")) {
          return (
            <ul key={index}>
              {block.split("\n").map((item) => <li key={item}>{item.replace("- ", "")}</li>)}
            </ul>
          );
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
