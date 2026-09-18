import { useEffect, useState } from "react";
import axios from "axios";

import Collections from "./components/Collections";
import ResponsePanel from "./components/ResponsePanel";
import BodyEditor from "./components/BodyEditor";
import Headers from "./components/Header";
import Params from "./components/Params";
import Auth from "./components/Auth";

function App() {
  // -----------------------------
  // Request states
  // -----------------------------
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [params, setParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [activeTab, setActiveTab] = useState("Params");

  // -----------------------------
  // Response states
  // -----------------------------
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Authorization
  // -----------------------------
  const [auth, setAuth] = useState({
    type: "none",
    apiKey: "",
    token: "",
  });

  // -----------------------------
  // History
  // -----------------------------
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("apiHistory");

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "apiHistory",
      JSON.stringify(history)
    );
  }, [history]);

  // -----------------------------
  // Collections
  // -----------------------------
  const [selectedCollection, setSelectedCollection] =
    useState("");

  const [collections, setCollections] = useState(() => {
    const savedCollections =
      localStorage.getItem("apiCollections");

    return savedCollections
      ? JSON.parse(savedCollections)
      : [
          {
            id: 1,
            name: "User API",
            requests: [],
          },
          {
            id: 2,
            name: "Product API",
            requests: [],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "apiCollections",
      JSON.stringify(collections)
    );
  }, [collections]);

  // -----------------------------
  // Send API request
  // -----------------------------
  const sendRequest = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    const startTime = performance.now();

    // Build URL with parameters
    let finalUrl = url;

    const queryParams = params
      .filter((param) => param.key)
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(
            param.value
          )}`
      )
      .join("&");

    if (queryParams) {
      finalUrl += `${
        url.includes("?") ? "&" : "?"
      }${queryParams}`;
    }

    try {
      // Prepare request body
      let parsedBody = undefined;

      if (
        body &&
        method !== "GET" &&
        method !== "DELETE"
      ) {
        parsedBody = JSON.parse(body);
      }

      // Prepare headers
      const headerObject = {};

      headers.forEach((header) => {
        if (header.key) {
          headerObject[header.key] = header.value;
        }
      });

      // Add authentication
      if (auth.type === "apikey" && auth.apiKey) {
        headerObject["X-API-Key"] = auth.apiKey;
      }

      if (auth.type === "bearer" && auth.token) {
        headerObject["Authorization"] =
          `Bearer ${auth.token}`;
      }

      // Axios request
      const result = await axios({
        method: method,
        url: finalUrl,
        headers: headerObject,
        data: parsedBody,
      });

      const endTime = performance.now();

      // Set response
      setResponse({
        status: result.status,
        statusText: result.statusText,
        time: Math.round(endTime - startTime),
        data: result.data,
      });

      // Add to history
      const historyItem = {
        method: method,
        url: finalUrl,
        time: new Date().toLocaleTimeString(),
      };

      setHistory((previousHistory) => [
        historyItem,
        ...previousHistory,
      ]);
    } catch (err) {
      const endTime = performance.now();

      if (err.response) {
        setResponse({
          status: err.response.status,
          statusText: err.response.statusText,
          time: Math.round(endTime - startTime),
          data: err.response.data,
        });
      } else {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  // -----------------------------
  // New Request
  // -----------------------------
  const newRequest = () => {
    setMethod("GET");
    setUrl("");
    setBody("");
    setParams([]);
    setHeaders([]);

    setAuth({
      type: "none",
      apiKey: "",
      token: "",
    });

    setResponse(null);
    setError("");
    setActiveTab("Params");
  };

  // -----------------------------
  // Create Collection
  // -----------------------------
  const createCollection = () => {
    const name = prompt("Enter collection name:");

    if (!name || !name.trim()) {
      return;
    }

    const newCollection = {
      id: Date.now(),
      name: name.trim(),
      requests: [],
    };

    setCollections((previousCollections) => [
      ...previousCollections,
      newCollection,
    ]);
  };

  // -----------------------------
  // Save Request
  // -----------------------------
  const saveRequest = () => {
    if (!url) {
      alert("Please enter a request URL first.");
      return;
    }

    if (collections.length === 0) {
      alert("Please create a collection first.");
      return;
    }

    const collectionId =
      selectedCollection || collections[0].id;

    const newRequest = {
      id: Date.now(),
      name: `${method} Request`,
      method: method,
      url: url,
      body: body,
      params: params,
      headers: headers,
      auth: auth,
    };

    setCollections((previousCollections) =>
      previousCollections.map((collection) =>
        collection.id === Number(collectionId)
          ? {
              ...collection,
              requests: [
                ...collection.requests,
                newRequest,
              ],
            }
          : collection
      )
    );

    alert("Request saved!");
  };

  // -----------------------------
  // Load Saved Request
  // -----------------------------
  const loadRequest = (request) => {
    setMethod(request.method);
    setUrl(request.url);
    setBody(request.body || "");
    setParams(request.params || []);
    setHeaders(request.headers || []);

    setAuth(
      request.auth || {
        type: "none",
        apiKey: "",
        token: "",
      }
    );

    setResponse(null);
    setError("");
    setActiveTab("Params");
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>API Studio</h1>

        <div className="header-buttons">
          <button onClick={newRequest}>
            New Request
          </button>

          <button>Settings</button>
        </div>
      </header>

      <div className="main">

        {/* Sidebar */}
        <aside className="sidebar">

          {/* Collection Actions */}
          <div className="collection-actions">

            <button onClick={createCollection}>
              + New Collection
            </button>

            <select
              value={selectedCollection}
              onChange={(e) =>
                setSelectedCollection(e.target.value)
              }
            >
              <option value="">
                Select Collection
              </option>

              {collections.map((collection) => (
                <option
                  key={collection.id}
                  value={collection.id}
                >
                  {collection.name}
                </option>
              ))}
            </select>

            <button onClick={saveRequest}>
              💾 Save Request
            </button>

          </div>

          {/* Collections */}
          <Collections
            collections={collections}
            onSelectRequest={loadRequest}
          />

          {/* History */}
          <h3>History</h3>

          {history.length === 0 ? (
            <p>No requests yet</p>
          ) : (
            history.map((item, index) => (
              <div
                className="history-item"
                key={index}
              >
                <strong>{item.method}</strong>

                <p>{item.url}</p>

                <small>{item.time}</small>
              </div>
            ))
          )}

        </aside>

        {/* Main Content */}
        <main className="content">

          {/* Request Bar */}
          <div className="request-bar">

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value)
              }
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>

            <input
              type="text"
              placeholder="Enter request URL"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
            />

            <button
              className="send-button"
              onClick={sendRequest}
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </div>

          {/* Request Section */}
          <section className="request-section">

            {/* Tabs */}
            <div className="tabs">

              <button
                className={
                  activeTab === "Params"
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Params")
                }
              >
                Params
              </button>

              <button
                className={
                  activeTab === "Headers"
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Headers")
                }
              >
                Headers
              </button>

              <button
                className={
                  activeTab === "Body"
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Body")
                }
              >
                Body
              </button>

              <button
                className={
                  activeTab === "Auth"
                    ? "active-tab"
                    : ""
                }
                onClick={() =>
                  setActiveTab("Auth")
                }
              >
                Auth
              </button>

            </div>

            {/* Params */}
            {activeTab === "Params" && (
              <Params
                params={params}
                setParams={setParams}
              />
            )}

            {/* Headers */}
            {activeTab === "Headers" && (
              <Headers
                headers={headers}
                setHeaders={setHeaders}
              />
            )}

            {/* Body */}
            {activeTab === "Body" && (
              <BodyEditor
                body={body}
                setBody={setBody}
              />
            )}

            {/* Auth */}
            {activeTab === "Auth" && (
              <Auth
                auth={auth}
                setAuth={setAuth}
              />
            )}

          </section>

          {/* Response */}
          <ResponsePanel
            response={response}
            error={error}
          />

        </main>
      </div>
    </div>
  );
}

export default App;