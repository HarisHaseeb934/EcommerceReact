import { useNavigate, useRouteError } from "react-router-dom"

const ErrorPage = () => {
   const error = useRouteError();
   const navigate = useNavigate();
  return (
    <section className="bg-[url(Error404.png)] bg-cover bg-center h-screen">
        <h1 className="text-2xl">Oops An Error Occured!</h1>
        {error && <p>{error.data}</p>}
        <button onClick={() => navigate(-1)} className="bg-red-500 px-4 py-3 text-white font-bold">Go Back</button>
    </section>
  )
}

export default ErrorPage