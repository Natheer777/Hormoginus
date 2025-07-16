import {
  Footer,
  Verfiy_product,
  Details_Product,
  Navbar,
} from "../../sections";
import { Background } from "../../../components/index";
import Logo from "../../assets/Asset 11@8x.png";
import { useParams } from "react-router-dom";
export default function Products() {
  const { param } = useParams();
  return (
    <>
      {/* <div>
        <nav className="navbar navbar-expand-lg pb-4">
          <div className="container container-fluid">
            <a className="navbar-brand hidden" href="#">
              <img src={Logo} alt="" />
            </a>        
          </div>
        </nav>
      </div> */}
      <Navbar />
      <Details_Product productName={param} />
      <Background />
      <Verfiy_product />
      <Footer />
    </>
  );
}
