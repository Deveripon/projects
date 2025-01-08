import { Chela_One } from "next/font/google";
import localChelaFont from "next/font/local";

export const chelaOne = Chela_One({
    subsets: ["latin"],
    display: "swap",
    weight: ["400"],
});

export const chela = localChelaFont({
    src: "./fonts/ChelaOne-Regular.ttf",
    display: "swap",
    variable: "--chelaFont",
});
