import { Background } from "../../../components";
import { Navbar, Header, Footer, AboutUs, Comment, Verfiy_product, ContactUs, Products_home, BestSells } from "../../sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <Background />
      <Header />
      <AboutUs />     
      <Products_home />
      <BestSells />
      <Comment />
      <ContactUs />
      <Verfiy_product />
      <Footer />
    </>
  )
}
