import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex justify-center">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Oops!</h1>
            <p className="py-4">Sorry, an unexpected error has occurred.</p>
            <div className="my-5">
              <span className="text-red-600">
                {error.statusText || error.message}
              </span>
            </div>
            <a href="/" className="btn btn-primary">
              Go back to the Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
