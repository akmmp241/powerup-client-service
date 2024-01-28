import Link from "next/link";

export default function Home() {
  return (
      <>
        <main>
          <h1 className={"text-9xl"}>Home</h1>
          <Link className={"font-black"} href={"/login"}>
            <button>Login</button>
          </Link>
          <Link className={"font-black"} href={"/register"}>
            <button>Register</button>
          </Link>
        </main>
      </>
  );
}
