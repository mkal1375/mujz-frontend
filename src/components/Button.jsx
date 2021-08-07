export default function Button({ className, ...props }) {
  return (
    <button
      className={`text-gray-700 flex justify-center items-center p-3 rounded-lg bg-yellow-200 active:bg-yellow-300 hover:bg-yellow-300 transition disabled:text-gray-500 disabled:bg-gray-300 disabled:pointer-events-none  ${
        className ? className : ""
      }`}
      {...props}
    />
  );
}
