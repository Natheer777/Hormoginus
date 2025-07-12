import { Background } from "../../../components";
import { Navbar, Header, Footer, About_us, Comment, Verfiy_product, ContactUs, Products_home } from "../../sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <Background />
      <Header />
      <About_us />
      {/* <Products_home /> */}
      <Comment />
      <ContactUs />
      <Verfiy_product />
      <Footer />
    </>
  )
}
