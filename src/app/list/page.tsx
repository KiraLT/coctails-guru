import { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
    title: 'Create/edit list',
    description:
        "Create your unique cocktail recipe lists, share your mixology passion, and inspire others. Our 'Create and Share Cocktails' page lets you craft personalized cocktail lists to share with the world. Start your mixology journey with us today!",
    robots: {
        index: false
    }
}

export default function Page(): JSX.Element {
    return (
        <>
            <Content />
        </>
    )
}
