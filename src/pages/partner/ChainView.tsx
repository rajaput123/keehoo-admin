import { useState } from "react";
import { ChevronRight, ChevronDown, UserCircle, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  mockPartners, mockTemples,
  getReferredPartners, getPartnerTemples, getPartnerChain,
  type PartnerChain, type PartnerStatus
} from "@/data/partnerEcosystemData";

const statusColors: Record<PartnerStatus, string> = {
  "Pending Review": "bg-status-progress/15 text-status-progress",
  Active: "bg-status-success/15 text-status-success",
  Suspended: "bg-status-pending/15 text-status-pending",
  Rejected: "bg-status-rejected/15 text-status-rejected",
};

const ChainView = () => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerChain | null>(null);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2">
        <h1 className="text-2xl font-semibold text-foreground">Chain View</h1>
        <p className="text-sm text-muted-foreground mt-1">Visual hierarchy of partner referral chains</p>
      </div>
      <div className="flex-1 px-8 py-5 space-y-3">
        {mockPartners.filter(p => !p.parentPartnerId && p.status === "Active").map(root => (
          <ChainNode key={root.id} partner={root} depth={0} onView={setSelectedPartner} />
        ))}
      </div>

      <Sheet open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedPartner && (
            <div className="space-y-5 pt-4">
              <SheetHeader><SheetTitle>{selectedPartner.fullName}</SheetTitle></SheetHeader>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">City:</span><p className="font-medium">{selectedPartner.city}</p></div>
                <div><span className="text-muted-foreground">Type:</span><p className="font-medium">{selectedPartner.type}</p></div>
                <div><span className="text-muted-foreground">Experience:</span><p className="font-medium">{selectedPartner.experience}</p></div>
                <div><span className="text-muted-foreground">Status:</span><Badge className={cn("border-0 text-xs", statusColors[selectedPartner.status])}>{selectedPartner.status}</Badge></div>
                <div><span className="text-muted-foreground">Referral Code:</span><p className="font-mono text-xs font-medium">{selectedPartner.referralCode}</p></div>
                <div><span className="text-muted-foreground">Earnings:</span><p className="font-medium">₹{selectedPartner.totalEarnings.toLocaleString()}</p></div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm mb-2">Chain</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {(() => { const c = getPartnerChain(selectedPartner.id, mockPartners); return (<>
                    {c.l2 && <><Badge variant="outline" className="text-xs">L2: {c.l2.fullName}</Badge><ChevronRight size={14} className="text-muted-foreground" /></>}
                    {c.l1 && <><Badge variant="outline" className="text-xs">L1: {c.l1.fullName}</Badge><ChevronRight size={14} className="text-muted-foreground" /></>}
                    <Badge className="bg-primary/10 text-primary border-0 text-xs">Direct: {selectedPartner.fullName}</Badge>
                  </>); })()}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Referred ({getReferredPartners(selectedPartner.id, mockPartners).length})</h4>
                <div className="space-y-1">
                  {getReferredPartners(selectedPartner.id, mockPartners).map(r => (
                    <div key={r.id} className="flex items-center justify-between text-sm py-1.5 px-2 rounded bg-muted/50">
                      <span className="font-medium">{r.fullName}</span>
                      <Badge className={cn("border-0 text-xs", statusColors[r.status])}>{r.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const ChainNode = ({ partner, depth, onView }: {
  partner: PartnerChain; depth: number; onView: (p: PartnerChain) => void;
}) => {
  const [expanded, setExpanded] = useState(depth < 2);
  const children = getReferredPartners(partner.id, mockPartners).filter(p => p.status === "Active");
  const templeCount = getPartnerTemples(partner.id, mockTemples).length;

  return (
    <div className={cn("border border-border rounded-lg", depth > 0 && "ml-8")}>
      <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50" onClick={() => setExpanded(!expanded)}>
        {children.length > 0 ? (
          expanded ? <ChevronDown size={16} className="text-muted-foreground shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />
        ) : <div className="w-4" />}
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><UserCircle size={18} /></div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground text-sm">{partner.fullName}</p>
          <p className="text-xs text-muted-foreground">{partner.city} · {partner.referralCode}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span><Building2 size={12} className="inline mr-1" />{templeCount} temples</span>
          <span><Users size={12} className="inline mr-1" />{children.length} referrals</span>
          <span className="font-medium text-foreground">₹{partner.totalEarnings.toLocaleString()}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs shrink-0" onClick={e => { e.stopPropagation(); onView(partner); }}>View</Button>
      </div>
      {expanded && children.length > 0 && (
        <div className="pb-2">
          {children.map(child => <ChainNode key={child.id} partner={child} depth={depth + 1} onView={onView} />)}
        </div>
      )}
    </div>
  );
};

export default ChainView;
