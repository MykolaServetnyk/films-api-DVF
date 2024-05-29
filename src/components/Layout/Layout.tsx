import Navigation from '../Navigation/Navigation';
import { Suspense } from "react";
import css from './Layout.module.css';

type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    
    return (
        <div className={css.container}>
            <Navigation />
            <Suspense fallback={<div>Please wait loading page...</div>}>
                {children}
            </Suspense>
        </div>
    )
}