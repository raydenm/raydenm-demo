const Header = () => {
  return (
    <div className="mx-auto grid max-w-screen-xl py-10">
      <div className="">
        <h1 className="mb-4 w-full max-w-2xl  text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
          Vercel Postgres
        </h1>
        <p className="max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
          Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions and your frontend
          framework.
        </p>
      </div>
    </div>
  )
}

export default Header
