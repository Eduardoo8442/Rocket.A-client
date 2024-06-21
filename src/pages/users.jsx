import '../app/globals.css';
import UsersList from "@/app/components/embed-users-list";
import RightBar from "@/app/components/templates/RightBar";
export default function Users() {
    return(
        <div className="bg-gray-900 min-h-screen flex">
            <RightBar />
            <UsersList />
        </div>
    )
}