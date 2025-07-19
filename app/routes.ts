import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
] satisfies RouteConfig;
function route(path: string, file: string): import("@react-router/dev/routes").RouteConfigEntry {
    return {
        path,
        file,
    };
}

