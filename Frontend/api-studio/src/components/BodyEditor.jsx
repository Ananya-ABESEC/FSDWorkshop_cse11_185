function BodyEditor({ body, setBody }) {

  return (

    <div className="body-editor">

      <h3>Request Body</h3>

      <textarea
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
        placeholder={`{
  "name": "Ananya",
  "course": "CSE"
}`}
      />

    </div>

  );
}

export default BodyEditor;