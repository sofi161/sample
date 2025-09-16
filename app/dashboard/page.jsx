import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}

export const metadata = {
  title: "Moodl • Dashboard",
};
