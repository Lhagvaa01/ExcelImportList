import logo from "./logo.svg";
import "./App.css";
import { Flex, Layout } from "antd";
import ContentPage from "./Pages/Content";
import ResponsiveAppBar from "./Components/AppBar";
import ResponsiveFooter from "./Components/Footer";
import { Routes, Route } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const headerStyle = {
    textAlign: "center",
    // color: "#fff",
    height: 100,
    paddingInline: 0,
    lineHeight: "100px",
    // backgroundColor: "red",
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    // backgroundColor: "#0958d9",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    height: "100%",
    color: "#fff",
    backgroundColor: "#1677ff",
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    padding: 0,
    backgroundColor: "#4096ff",
  };
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    // maxWidth: "calc(50% - 8px)",
  };
  return (
    <div className="App">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <ResponsiveAppBar />
        </Header>
        <Layout>
          {/* <Sider width="25%" style={siderStyle}>
            Sider
          </Sider> */}
          <Content style={contentStyle}>
            <Routes>
              <Route path="/*" element={<ContentPage />} />
            </Routes>
          </Content>
        </Layout>
        <Footer style={footerStyle}>
          <ResponsiveFooter />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
