export default function Input({
  type = "text",
  placeholder,
  className,
  ...props
}) {
  return (
    <input
      placeholder={placeholder}
      className={`flex-grow py-2 w-full px-4 rounded-lg outline-none border focus:border-gray-300 transition shadow-sm ${
        className ? className : ""
      }`}
      type={type}
      {...props}
    />
  );
}

function Label({ name, ...props }) {
  return (
    <label htmlFor={name} {...props}>
      {name}
    </label>
  );
}

function Error({ className, ...props }) {
  return (
    <span
      className={`text-red-400 text-sm mt-1 block ${
        className ? className : ""
      }`}
      {...props}
    />
  );
}

export function Field({ name, error = [], wrapperProps = {}, ...props }) {
  const { className, ...otherProps } = wrapperProps;
  return (
    <div
      className={`w-full mb-2 ${className ? className : ""}`}
      {...otherProps}
    >
      <Label name={name} className="mb-0.5 text-sm text-gray-500" />
      <Input {...props} />
      {error[0] ? <Error>{error[1]}</Error> : null}
    </div>
  );
}
