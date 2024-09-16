import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import PricingPage from "./components/pages/Pricing";
import DocumentDownload from "./components/DocumentDownload";

const App = () => {
    return (
        <div className=" h-[100dvh] w-[100vw] font-primary bg-pageMainBackground overflow-x-hidden">
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/products" element={<Products />}></Route>
                <Route path="/pricing" element={<PricingPage />}></Route>
                <Route path="/kiosk" element={<DocumentDownload />}></Route>
            </Routes>
        </div>
    );
};

export default App;
