import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";

const ResponsiveFooter = () => {
  return (
    <Footer container>
      <div className="grid grid-cols-1 w-full h-20 px-10 justify-between  text-black text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { sm: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            LOGO
          </Typography>
          <FooterLinkGroup className="gap-3 sm:justify-center">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by=" POWERED BY KACC.MN" year={2024} />
      </div>
    </Footer>
  );
};

export default ResponsiveFooter;
