import { AuthForm } from "../../components/forms/AuthForm";
import { AuthInputs } from "../../components/inputs/AuthInputs";
import { AuthLayout } from "../../components/layouts/auth/AuthLayout";
import fynloLogo from "../../assets/fynlo-logo.png";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import { LoadingScreen } from "../../components/loaders/LoadingScreen";

export const LoginPage = () => {
  const { loading, setEmail, setPassword, handleLogin } = useLogin();
  return (
    <div className="flex min-h-screen justify-center bg-background px-4 py-8">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex w-full max-w-md flex-col justify-center items-center">
          <img
            className="mb-8 w-20 rounded-full sm:w-23"
            src={fynloLogo}
            alt="fynlo-logo"
          />
          <AuthLayout
            heading="Welcome back!"
            subheading="Sign in to your budget dashboard"
          >
            <AuthForm type="submit" onSubmit={handleLogin} text="Sign in">
              <AuthInputs
                type="text"
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
            <p className="text-text-secondary mr-1">Don't have and account?</p>
            <Link to="/register" className="text-accent">
              Create account
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};
