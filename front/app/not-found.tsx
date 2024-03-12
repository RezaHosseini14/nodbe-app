import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="flex items-center justify-center flex-col gap-4 bg-mianColor rounded-xl p-4">
        <h1 className="text-white text-8xl font-bold">404</h1>
        <h1 className="text-white text-3xl">صفحه مورد نظر یافت نشد!</h1>
        <Link className="decoration-transparent" href="/">
          <span className="text-white text-xl">بازگشت به خانه</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
