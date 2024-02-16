import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  function createNewPost(event) {
    event.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    fetch(`${process.env.REACT_APP_SERVERURL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <input type="file" onChange={(event) => setFiles(event.target.files)} />
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button style={{ marginTop: "5px" }}>Create new post</button>
    </form>
  );
}
