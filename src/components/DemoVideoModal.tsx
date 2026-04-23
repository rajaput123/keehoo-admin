import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DemoVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoVideoModal = ({ open, onOpenChange }: DemoVideoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-10 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video">
          <video
            src="/demo-video.mp4"
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoVideoModal;
