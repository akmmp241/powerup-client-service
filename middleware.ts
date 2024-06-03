import {NextRequest, NextResponse} from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('POWERUP-API-KEY');
  let isLogin: boolean = false;

  if (token) {
    const res = (await fetch(`${process.env.API_URL}/auth/user`, {
      headers: {
        "POWERUP-API-KEY": token.value
      }
    })).json();

    await res.then((res) => {
      isLogin = res.success
    });
  }

  if (isLogin) {
    return NextResponse.redirect(new URL('/', request.url))
  }
};

export const config = {
  matcher: [
    "/login", "/register", "/forget-password", "/reset-password"
  ]
}