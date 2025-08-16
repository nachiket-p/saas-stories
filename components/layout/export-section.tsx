'use client';

import { useState } from 'react';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Share2, Camera, Loader2 } from 'lucide-react';
import { exportToPDF, shareableLink, createSnapshot } from '@/lib/export/pdf-export';

export function ExportSection() {
  const { analysis, selectedScenario } = useMetricsStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleExportPDF = async () => {
    if (!analysis) return;

    setIsExporting(true);
    setExportMessage(null);

    try {
      await exportToPDF({
        analysis,
        scenario: selectedScenario,
        timestamp: new Date(),
      });
      setExportMessage('PDF exported successfully! Check your downloads folder.');
    } catch (error) {
      setExportMessage('Failed to export PDF. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCreateSnapshot = () => {
    const snapshotId = createSnapshot();
    setExportMessage(`Snapshot created: ${snapshotId}`);
  };

  const handleShare = () => {
    if (!analysis) return;

    try {
      const link = shareableLink({
        analysis,
        scenario: selectedScenario,
        timestamp: new Date(),
      });
      
      navigator.clipboard.writeText(link).then(() => {
        setExportMessage('Shareable link copied to clipboard!');
      }).catch(() => {
        setExportMessage(`Shareable link: ${link}`);
      });
    } catch (error) {
      setExportMessage('Failed to create shareable link.');
    }
  };

  if (!analysis) return null;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Export & Share
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <Button 
          onClick={handleExportPDF}
          disabled={isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? 'Exporting...' : 'Download PDF'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleCreateSnapshot}
          className="gap-2"
        >
          <Camera className="w-4 h-4" />
          Save Snapshot
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Link
        </Button>
      </div>

      {exportMessage && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            {exportMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>PDF Report:</strong> Complete metrics analysis with recommendations
        </p>
        <p>
          <strong>Snapshot:</strong> Quick save of current state for comparison
        </p>
        <p>
          <strong>Share Link:</strong> Send your metrics to colleagues or mentors
        </p>
      </div>
    </Card>
  );
}