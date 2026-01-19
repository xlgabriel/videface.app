import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import PricingPage from "./components/pages/Pricing";
import DocumentDownload from "./components/DocumentDownload";
import Form from "./components/Form";
import DottedBackground from "./components/DottedBackground";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
    return (
        <>
            <DottedBackground spacing={30} size={0.7} opacity={0.18} color="0,0,0" speed={1} />
            <div className="font-primary bg-transparent overflow-x-hidden">                <ScrollToTop />                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/pricing" element={<PricingPage />}></Route>
                    <Route path="/kiosk" element={<DocumentDownload />}></Route>
                    <Route path="/form" element={<Form />}></Route>
                </Routes>
            </div>
        </>
    );
};

export default App;
