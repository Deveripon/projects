import Footer from "@/app/_components/footer/Footer";
import Header from "@/app/_components/header/Header";
import { supportedLocales } from "@/middleware";
import ReservationProvider from "@/providers/ReservationProvider";
import { connectMongoDB } from "@/service/mongoConnection";
export async function generateStaticParams() {
    return supportedLocales.map((locale) => ({ lang: locale }));
}

export default async function MainLayout({ children, auth }) {
    await connectMongoDB();
    return (
        <div>
            <ReservationProvider>
                <Header />
                {auth}
                {children}
                <Footer />
            </ReservationProvider>
        </div>
    );
}
