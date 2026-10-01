export default function parseMeterTypes(type = "") {
  const parsed = type
    .replace(/[{}]/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({
      id: item,
      name: item,
    }));

  if (parsed.length) {
    return parsed;
  }

  return [
    {
      id: "Prepaid",
      name: "Prepaid",
    },
    {
      id: "Postpaid",
      name: "Postpaid",
    },
  ];
}