import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Field } from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  function submit(data) {
    console.log("in");
    console.log(data);
  }
  return (
    <div className="login w-full rounded-lg bg-indigo-50 p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Sign Up</h2>
      <form className="w-full" onSubmit={handleSubmit(submit)}>
        <div>
          <Field
            {...register("email", {
              required: true,
            })}
            error={[errors.email, "email is required!"]}
            name="email"
            placeholder="Please use a real email address :D"
          />
          <Field
            {...register("password", { required: true })}
            error={[errors.password, "password is required!"]}
            name="password"
            placeholder="Choose a strong one."
            type="password"
          />
        </div>
        <div className="flex gap-4 justify-between items-center mt-2">
          <Button type="submit" className="flex-grow">
            Sign me up
          </Button>
          <div className="text-xs">
            <div className="text-gray-600">Already a member?</div>
            <Link to="/login" className="text-indigo-400 font-bold">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
