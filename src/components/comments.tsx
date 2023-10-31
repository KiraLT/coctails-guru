'use client'
import { DiscussionEmbed } from 'disqus-react'
import { useAsync } from 'react-async-hook'

export function Comments({
    name,
    className,
}: {
    name: string
    className?: string
}): JSX.Element {
    const url = useAsync(async () => window.location.href, [name])

    if (url.result && process.env.NEXT_PUBLIC_DISQUS_NAME) {
        return (
            <div className={`${className} text-black`}>
                <DiscussionEmbed
                    shortname={process.env.NEXT_PUBLIC_DISQUS_NAME}
                    config={{
                        url: url.result,
                        identifier: name,
                        title: name,
                    }}
                />
            </div>
        )
    }
    return <div></div>
}
