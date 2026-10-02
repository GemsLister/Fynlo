import { AuthForm } from "../../components/forms/AuthForm";
import { AuthInputs } from "../../components/inputs/AuthInputs";
import { AuthLayout } from "../../components/layouts/auth/AuthLayout";
import { useRegister } from "../../hooks/auth/useRegister";
import fynloLogo from "../../assets/fynlo-logo.png";

export const RegisterPage = () => {
  const { setUsername, setPassword, setEmail, handleRegister } = useRegister();
  return (
    <div className="flex justify-center bg-background h-screen">
      <div className="flex flex-col justify-center items-center">
        <img
          className="mb-8 rounded-full w-23 mr-4"
          src={fynloLogo}
          alt="fynlo-logo"
        />
        <AuthLayout
          heading="Create your account"
          subheading="Your finances, at a glance."
        >
          <AuthForm onSubmit={handleRegister} text="Sign up">
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
        <span className="flex text-text-primary font-sans text-sm mt-5">
          <p className="text-text-secondary mr-1">Already have an account?</p>
          <a href="/" className="text-accent">
            Sign in
          </a>
        </span>
      </div>
    </div>
  );
};
