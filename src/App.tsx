import { MainLayout } from "./layouts/MainLayout";
import { UsersPage } from "./features/users/UsersPage";

export function App() {
  return (
    <MainLayout>
      <UsersPage />
    </MainLayout>
  );
}
