import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
    </>
  );
}
