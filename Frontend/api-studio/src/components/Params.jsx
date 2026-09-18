import { useState } from "react";

function Params({ params, setParams }) {

  const addParam = () => {
    setParams([
      ...params,
      {
        key: "",
        value: ""
      }
    ]);
  };

  const updateParam = (index, field, value) => {

    const updated = [...params];

    updated[index][field] = value;

    setParams(updated);
  };

  return (
    <div>

      <button onClick={addParam}>
        + Add Parameter
      </button>

      {params.map((param, index) => (

        <div key={index}>

          <input
            placeholder="Key"
            value={param.key}
            onChange={(e) =>
              updateParam(
                index,
                "key",
                e.target.value
              )
            }
          />

          <input
            placeholder="Value"
            value={param.value}
            onChange={(e) =>
              updateParam(
                index,
                "value",
                e.target.value
              )
            }
          />

        </div>

      ))}

    </div>
  );
}

export default Params;