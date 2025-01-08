import RegisterPageCard from "@/app/_components/auth/RegisterPageCard";
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
            <RegisterPageCard />
        </Modal>
    );
};

export default page;
