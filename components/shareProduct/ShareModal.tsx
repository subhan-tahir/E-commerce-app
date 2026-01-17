
"use client"
import { useState } from 'react'
import { Product } from '@/types'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Share2, Check, Copy } from 'lucide-react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'next-share'
import { Input } from '../ui/input'

interface ShareModalProps {
  product: Product;
}
const ShareModal = ({ product }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`;


  return (

    <>
      {/*share*/}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </DialogTrigger>
     
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this product</DialogTitle>
          </DialogHeader>

          {/* Copy Link */}
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
            <Button
              size="icon"
              onClick={async () => {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Social Share */}
          <div className="flex justify-center gap-4 pt-4">
            <WhatsappShareButton url={shareUrl} title={product.title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <FacebookShareButton url={shareUrl} quote={product.title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={product.title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ShareModal
