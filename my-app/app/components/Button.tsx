interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button
      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl mt-4"
    >
      {text}
    </button>
  );
}
