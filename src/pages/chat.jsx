import '../app/globals.css';
import RightBar from '@/app/components/templates/RightBar';
import ChatEmbed from '@/app/components/component-main-chat';
export default function Chat() {

    return (
        <div className="bg-gray-900 min-h-screen flex">
            <RightBar />
            <ChatEmbed />
        </div>
    );
}