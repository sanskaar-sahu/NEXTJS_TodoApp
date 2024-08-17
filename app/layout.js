
import Navbar from "@components/Navbar";
import "@styles/globals.css";
import fevicon from "@public/favicon.ico"

export const metadata = {
  title: "Todo App",
  description: "Created by Sanskar Sahu",
  icon : {fevicon}
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" src={metadata.icon}/>
      </head>
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
