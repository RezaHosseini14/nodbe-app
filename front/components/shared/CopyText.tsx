import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { IoCopyOutline, IoCopy, IoCardOutline } from "react-icons/io5";

function CopyText({ title, desc, text }: { title: string; desc: string; text: string }) {
  const staticContent = text;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(staticContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    });
  };
  return (
    <div className="card sp_card flex-1 flex items-center justify-center gap-8">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{staticContent}</span>
            <span className="font-bold text-xs">{desc}</span>
          </div>
          <CopyToClipboard text={staticContent} onCopy={handleCopy}>
            <button className="text-2xl" disabled={copied}>
              {copied ? <IoCopy /> : <IoCopyOutline />}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default CopyText;
