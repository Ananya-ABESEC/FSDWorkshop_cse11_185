function ResponsePanel({ response, error }) {

  return (

    <section className="response-section">

      <div className="response-header">

        <h2>Response</h2>

        {response && (

          <div>

            <span>
              Status: {response.status}
            </span>

            <span>
              Time: {response.time} ms
            </span>

          </div>

        )}

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <pre>

        {response
          ? JSON.stringify(
              response.data,
              null,
              2
            )
          : "Response will appear here..."}

      </pre>

    </section>

  );
}

export default ResponsePanel;