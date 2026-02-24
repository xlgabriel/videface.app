import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import PricingPage from "./components/pages/Pricing";
import DocumentDownload from "./components/DocumentDownload";
import VidefaceKiosk from "./components/pages/kiosk/VidefaceKiosk";
import Form from "./components/Form";
import DottedBackground from "./components/DottedBackground";
import ScrollToTop from "./components/ScrollToTop";
import usePageView from "./hooks/usePageView";
import VidefaceSmartLocker from "./components/pages/SmarLocker/VidefaceSmartLocker";
import Keydrop from "./components/pages/keydrop/keydrop";

const App = () => {
    // Track page views at the app level. This hook is safe to call once here
    // and will no-op if `gtag` hasn't loaded yet. It uses react-router's
    // `useLocation` internally to detect route changes.
    usePageView();
    return (
        <>
            <DottedBackground spacing={30} size={0.7} opacity={0.18} color="0,0,0" speed={1} />
            <div className="font-primary bg-transparent overflow-x-hidden">                <ScrollToTop />                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/pricing" element={<PricingPage />}></Route>
                    <Route path="/kiosk" element={<VidefaceKiosk />}></Route>
                    <Route path="/smart-locker" element={<VidefaceSmartLocker />}></Route>
                    <Route path="/keydrop" element={<Keydrop />}></Route>
                    <Route path="/form" element={<Form />}></Route>
                </Routes>
            </div>
        </>
    );
};

export default App;
