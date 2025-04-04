import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: "/auth",  // Redirect to signIn page if not authenticated
    }
});

export const config = {
    matcher: [
        "/dashboard",     
        "/landingpage",
        "/leaderboard",
        "/setting",                         
        "/"               
    ]
};
