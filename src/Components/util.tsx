export function ErrorBar({ err }: { err: Error | null }) {
  if (!err) return <></>;

  let message = err.message;
  if (message === "Failed to fetch") {
    message = "ネットワークが切断されています";
  }

  console.error(err);
  return (
    <div id="errorMassage" className="text-red-500 h-5 text-xl">
      <p>⚠️{message}</p>
    </div>
  );
}

export function CustomButton({
  label,
  onClick,
  disabled = true,
  loading = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading: boolean;
}) {
  return (
    <div>
      {loading ? (
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      ) : (
        <button
          className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-xl transition delay-150 duration-200 hover:bg-blue-500 hover:scale-110 disabled:bg-blue-300"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </button>
      )}
    </div>
  );
}
