import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Player from "./components/Player";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) Layout = route.layout;
                    else if (route.layout === null) Layout = React.Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) Layout = route.layout;
                    else if (route.layout === null) Layout = React.Fragment;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
            <Player />
        </div>
    );
}

export default App;
