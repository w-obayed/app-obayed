import { requiredUser } from "../lib/hooks";

const DashboardPage = async () => {
  const session = await requiredUser();

  return (
    <div>
      <h1>Hello dashbord</h1>
    </div>
  );
};

export default DashboardPage;
