import { AuthForm } from "../../components/forms/AuthForm";
import { AuthInputs } from "../../components/inputs/AuthInputs";
import { AuthLayout } from "../../components/layouts/auth/AuthLayout";
import fynloLogo from "../../assets/fynlo-logo.png";

export const LoginPage = () => {
  return (
    <div className="flex justify-center bg-background h-screen">
      <div className="flex flex-col justify-center items-center">
        <img
          className="mb-8 rounded-full w-23 mr-4"
          src={fynloLogo}
          alt="fynlo-logo"
        />
        <AuthLayout
          heading="Welcome back!"
          subheading="Sign in to your budget dashboard"
        >
          <AuthForm>
            <AuthInputs
              type="text"
              placeholder="you@example.com"
              label="EMAIL"
              setValue={() => {}}
            />
            <AuthInputs
              type="password"
              placeholder="********"
              label="PASSWORD"
              setValue={() => {}}
            />
          </AuthForm>
        </AuthLayout>
        <span className="flex text-text-primary font-sans text-sm mt-5">
          <p className="text-text-secondary mr-1">Don't have and account?</p>
          <a href="/register" className="text-accent">
            Sign In
          </a>
        </span>
      </div>
    </div>
  );
};
