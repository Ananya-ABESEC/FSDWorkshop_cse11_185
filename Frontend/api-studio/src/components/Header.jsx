function Headers({ headers, setHeaders }) {

  const addHeader = () => {

    setHeaders([
      ...headers,
      {
        key: "",
        value: ""
      }
    ]);

  };

  const updateHeader = (index, field, value) => {

    const updatedHeaders = [...headers];

    updatedHeaders[index][field] = value;

    setHeaders(updatedHeaders);

  };

  const deleteHeader = (index) => {

    const updatedHeaders = headers.filter(
      (_, i) => i !== index
    );

    setHeaders(updatedHeaders);

  };

  return (

    <div className="headers">

      <button onClick={addHeader}>
        + Add Header
      </button>

      {headers.map((header, index) => (

        <div
          className="header-row"
          key={index}
        >

          <input
            placeholder="Key"
            value={header.key}
            onChange={(e) =>
              updateHeader(
                index,
                "key",
                e.target.value
              )
            }
          />

          <input
            placeholder="Value"
            value={header.value}
            onChange={(e) =>
              updateHeader(
                index,
                "value",
                e.target.value
              )
            }
          />

          <button
            onClick={() =>
              deleteHeader(index)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );
}

export default Headers;