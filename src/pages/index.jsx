import '../app/globals.css';
import TitleMain from '@/app/components/title-main';
import FormMain from '@/app/components/component-form-main';

export default function Index() {
    return(
        <div className="bg-gray-900 h-screen">
         <TitleMain />
         <FormMain />
        </div>
    )
}