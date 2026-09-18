function Collections({ collections, onSelectRequest }) {
  return (
    <div className="collections">
      <h3>Collections</h3>

      {collections.length === 0 ? (
        <p>No collections</p>
      ) : (
        collections.map((collection) => (
          <div
            className="collection"
            key={collection.id}
          >
            <div>
              📁 {collection.name}
            </div>

            {collection.requests &&
              collection.requests.length > 0 && (
                <div className="saved-requests">
                  {collection.requests.map((request) => (
                    <div
                      className="saved-request"
                      key={request.id}
                      onClick={() =>
                        onSelectRequest(request)
                      }
                    >
                      └── {request.method} {request.name}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))
      )}
    </div>
  );
}

export default Collections;