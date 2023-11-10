'use client'
import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'
import { useAsync } from 'react-async-hook'
import { Button } from 'react-daisyui'

export function Share() {
    const [copied, setCopied] = useState(false)
    const { result: url } = useAsync(async () => window.location.href, [])
    const id = `share-${url}`

    return (
        <>
            <div className="mb-2 alert alert-info">
                You can safely share this link to the list
            </div>
            <div className="form-control">
                <div className="input-group">
                    <input
                        type="text"
                        disabled={true}
                        value={url ?? ''}
                        className="input w-full"
                    />
                    <button
                        className={`btn btn-square ${
                            copied ? 'btn-success' : ''
                        }`}
                        onClick={() => {
                            navigator.clipboard.writeText(url ?? '')
                            setCopied(true)
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center">
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
