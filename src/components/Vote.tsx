import NewVote from "./NewVote";

export default function Vote({idCandidato, name, photo, votes, isTop, index }: any) {
  const voteClasses = `max-w-sm w-full sm: h-max mx-auto p-6 bg-white sm:col-span-1 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 
  ${isTop ? " col-span-3" : " col-span-1"}`;
  return (
    <div className={voteClasses}>
      <div className="flex justify-between">
        <h5 className="mb-2 uppercase text-2xl  dark:text-gray-200 font-bold tracking-tight text-gray-900">
          {name}
        </h5>
        <div className="flex">
          <span className="dark:text-white text-gray-800 font-bold">Votos: </span>
          <p className="dark:text-white text-gray-800 font-thin">{votes == null ? 'Logueate para ver los vtos: ': votes}</p>
        </div>
      </div>
      <img
        src={photo}
        alt="1231234sdw"
        className={` ${isTop ? "w-full" : "w-60"} mx-auto`}
      />
      <NewVote idCandidato={idCandidato} index={index} />
    </div>
  );
}
