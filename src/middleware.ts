export {default} from "next-auth/middleware";

export const config = {
    matcher: ['/dashboard/:path*']
    // matcher: ['/dashboard/:path*'] Para proteger todas las rutas que esten dentro de...

}