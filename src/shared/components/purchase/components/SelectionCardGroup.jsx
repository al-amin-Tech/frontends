import NetworkCard from "./NetworkCard";
/*
export default function SelectionCardGroup({
  title,
  value,
  options,
  onChange,
}) {
  return (
    <section className="space-y-5">

     <div className="flex flex-col items-center justify-center">
 
     <h2 className="text-lg font-bold">
            {title}
     </h2>

      <p className="text-gray-500 text-sm">
            choose your favorite provider.
      </p>
      </div>


      <div className="grid grid-cols-4 gap-3">

        {options.map((option) => (
          <NetworkCard
            key={option.id}
            option={option}
            selected={
              value === option.id
            }
            onClick={onChange}
          />
        ))}

      </div>

    </section>
  );
}

*/
export default function SelectionCardGroup({
  title,
  value,
  options,
  onChange,
}) {

  const columns = Math.min(options.length, 4);

  return (
    <section className="space-y-5">

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">
          {title}
        </h2>

        <p className="text-gray-500 text-sm">
          choose your favorite provider.
        </p>
      </div>


      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >

        {options.map((option) => (
          <NetworkCard
            key={option.id}
            option={option}
            selected={value === option.id}
            onClick={onChange}
          />
        ))}

      </div>

    </section>
  );
}
