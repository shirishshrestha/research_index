"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Info } from "lucide-react";
import { useSyncPublicationsMutation } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function SyncPublicationsButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [limit, setLimit] = useState<string>("");
  const syncMutation = useSyncPublicationsMutation({
    onSuccess: () => {
      setIsDialogOpen(false);
      setLimit("");
    },
  });

  const handleSync = () => {
    const syncData = limit ? { limit: parseInt(limit) } : {};
    syncMutation.mutate(syncData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="default" className="gap-2" variant="default">
          <RefreshCw className="h-4 w-4" />
          Sync from Journal Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sync Publications from External Portal</DialogTitle>
          <DialogDescription>
            Synchronize publication data from the external journal management
            system. This will fetch and import new publications into the
            platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                This operation may take several minutes depending on the number
                of publications. The process runs in the background.
              </p>
            </div>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="limit">Limit (optional)</Label>
            <Input
              id="limit"
              type="number"
              placeholder="Leave empty to sync all"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              min="1"
              disabled={syncMutation.isPending}
            />
            <p className="text-sm text-muted-foreground">
              Specify a number to limit publications for testing. Leave empty to
              sync all available publications.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={syncMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSync}
            disabled={syncMutation.isPending}
            className="gap-2"
          >
            {syncMutation.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Start Sync
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
