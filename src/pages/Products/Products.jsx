import {
  Footer,
  Verfiy_product,
  Details_Product,
  Navbar,
} from "../../sections";
import { Background } from "../../../components/index";
import Logo from "../../assets/Asset 11@8x.png";
export default function Products() {
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
      <Details_Product />
      <Background />
      <Verfiy_product />
      <Footer />
    </>
  );
}
