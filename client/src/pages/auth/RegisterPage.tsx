import { AuthForm } from "../../components/forms/AuthForm";
import { AuthInputs } from "../../components/inputs/AuthInputs";
import { AuthLayout } from "../../components/layouts/auth/AuthLayout";
import { useRegister } from "../../hooks/auth/useRegister";
import fynloLogo from "../../assets/fynlo-logo.png";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const { setUsername, setPassword, setEmail, handleRegister } = useRegister();
  return (
    <div className="flex min-h-screen justify-center bg-background px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-center items-center">
        <img
          className="mb-8 w-20 rounded-full sm:w-23"
          src={fynloLogo}
          alt="fynlo-logo"
        />
        <AuthLayout
          heading="Create your account"
          subheading="Your finances, at a glance."
        >
          <AuthForm type="submit" onSubmit={handleRegister} text="Sign up">
            <AuthInputs
              type="text"
              placeholder="Juan Dela Cruz"
              label="USERNAME"
              setValue={setUsername}
            />
            <AuthInputs
              type="email"
              placeholder="you@example.com"
              label="EMAIL"
              setValue={setEmail}
            />
            <AuthInputs
              type="password"
              placeholder="********"
              label="PASSWORD"
              setValue={setPassword}
            />
          </AuthForm>
        </AuthLayout>
        <span className="mt-5 flex flex-wrap justify-center text-center text-text-primary font-sans text-sm">
          <p className="text-text-secondary mr-1">Already have an account?</p>
          <Link to="/" className="text-accent">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};
