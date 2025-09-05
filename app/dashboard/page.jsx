import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export default function DashboardPage() {
  const isAuthenticated = false;
  let children = <Login />;

  if (isAuthenticated) {
    children = <Dashboard />;
  }
  return <Main>{children}</Main>;
}

export const metadata = {
  title: "Moodl • Dashboard",
};
