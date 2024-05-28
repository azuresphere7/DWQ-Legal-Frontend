import React from "react";
import { LightThemeProvider } from "../../providers/MuiThemeProvider";

interface PaperTextureProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const PaperTexture: React.FC<PaperTextureProps> = (props) => {
  return (
    <LightThemeProvider>
      <div {...props} style={{
        borderRadius: 4,
        boxShadow: "0 0 48px rgba(0,0,0,0.25)",
        backgroundImage: "url(/assets/texture/paper.jpg)",
        color: "black",
        animation: "fade-scale-up .5s"
      }}>
        {props.children}
      </div>
    </LightThemeProvider>
  );
};

export default PaperTexture;
