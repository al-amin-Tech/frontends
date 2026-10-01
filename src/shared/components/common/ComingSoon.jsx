export default function ComingSoon({ title }) {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-gray-500">
          This feature is coming soon.
        </p>
      </div>
    </div>
  );
}