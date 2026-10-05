import { MainLayout } from "./layouts/MainLayout";
import { UsersPage } from "./features/users/UsersPage";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}
