import NewVote from "./NewVote";

export default function Vote({
  idCandidato,
  name,
  photo,
  votes,
  isTop,
  index,
}: any) {
  return (
    <div className={isTop ? " col-span-1" : " col-span-1"}>
      <div
        className={` px-10 border-r border-b sm:border-r-0 border-gray-500
    `}
      >
        <div className="flex flex-col ">
          <h5 className="mb-2 uppercase text-center text-2xl  dark:text-gray-200 font-bold tracking-tight text-gray-900">
            {name}
          </h5>
          <NewVote idCandidato={idCandidato} index={index} />
          <div className="flex mx-auto ">
            <span className="dark:text-white  text-gray-800 font-bold">
              Votos:{" "}
            </span>
            <p className="dark:text-white  text-gray-800 font-extrabold">
              {votes == null ? "Ingresá para ver los votos" : votes}
            </p>
          </div>
        </div>
        <img
          src={photo}
          alt="1231234sdw"
          className={` w-60 h-60 object-cover mx-auto`}
        />
      </div>
    </div>
  );
}
