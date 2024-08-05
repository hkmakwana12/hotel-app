import { Helmet } from "react-helmet-async";
import SearchPropertyBill from "src/modules/property-tax/sections/property/search-property-bill";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page | {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>

      <SearchPropertyBill />
    </>
  );
}
