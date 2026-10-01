// src/shared/components/Debug.jsx
/*

export default function Debug() {
  return (
    <div
      style={{
        background: "red",
        color: "white",
        padding: "20px",
        fontSize: "24px",
      }}
    >
      DEBUG COMPONENT WORKING
    </div>
  );
}

*/

export default function Debug({ name, data }) {
  return (
    <pre className="bg-black text-green-400 p-4">
      {name}: {JSON.stringify(data, null, 2)}
    </pre>
  );
}
