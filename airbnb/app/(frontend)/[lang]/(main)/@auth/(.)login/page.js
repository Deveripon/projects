import LoginPageCard from "@/app/_components/auth/LoginPageCard";
import Modal from "@/app/_components/common/Modal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();
    if (session) {
        return redirect("/");
    }
    return (
        <Modal>
            <LoginPageCard />
        </Modal>
    );
};

export default page;
