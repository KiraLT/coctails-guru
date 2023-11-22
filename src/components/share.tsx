'use client'
import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { useAsync } from 'react-async-hook'
import { Button, Alert, Join, Input } from 'react-daisyui'
import { FaCircleInfo } from 'react-icons/fa6'

export function Share() {
    const [copied, setCopied] = useState(false)
    const { result: url } = useAsync(async () => window.location.href, [])
    const id = `share-${url}`

    return (
        <>
            <Alert status="info" className="mb-2" icon=<FaCircleInfo />>
                You can safely share this link to the list
            </Alert>
            <Join className="w-full">
                <Input
                    disabled={true}
                    value={url ?? ''}
                    className="join-item w-full"
                />
                <Button
                    className="join-item"
                    color={'neutral'}
                    onClick={() => {
                        navigator.clipboard.writeText(url ?? '')
                        setCopied(true)
                    }}
                >
                    {copied ? 'Copied' : 'Copy'}
                </Button>
            </Join>
            <div className="flex flex-col items-center mt-3">
                <QRCodeCanvas value={url ?? ''} size={264} id={id} />
                <Button
                    className="mt-5"
                    color="primary"
                    variant="outline"
                    onClick={() => {
                        const canvas = document.getElementById(id)
                        console.log(canvas)
                        if (canvas instanceof HTMLCanvasElement) {
                            const pngUrl = canvas
                                .toDataURL('image/png')
                                .replace('image/png', 'image/octet-stream')
                            let downloadLink = document.createElement('a')
                            downloadLink.href = pngUrl
                            downloadLink.download = `share.png`
                            document.body.appendChild(downloadLink)
                            downloadLink.click()
                            document.body.removeChild(downloadLink)
                        }
                    }}
                >
                    {'Download QR'}
                </Button>
            </div>
        </>
    )
}
