'use client'
import { DiscussionEmbed } from 'disqus-react'

export function Comments({
    name,
    className,
}: {
    name: string
    className?: string
}): JSX.Element {
    if (process.env.NEXT_PUBLIC_DISQUS_NAME) {
        return (
            <div className={className}>
                <DiscussionEmbed
                    shortname={process.env.NEXT_PUBLIC_DISQUS_NAME}
                    config={{
                        url: location.href,
                        identifier: name,
                        title: name,
                    }}
                />
            </div>
        )
    }
    return <div></div>
}
