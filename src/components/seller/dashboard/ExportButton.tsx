
import React from "react";
import { Language } from "@/hooks/useLanguageStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";

interface ExportButtonProps {
  language: Language;
}

const translations = {
  exportData: {
    KR: "데이터 내보내기",
    EN: "Export Data",
    CN: "导出数据",
    JP: "データのエクスポート",
  },
  downloading: {
    KR: "다운로드 중...",
    EN: "Downloading...",
    CN: "下载中...",
    JP: "ダウンロード中...",
  }
};

const ExportButton: React.FC<ExportButtonProps> = ({ language }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Sample data for CSV
      const data = [
        ["Date", "Sales", "Orders"],
        ["2025-04-01", "₩3,250,000", "12"],
        ["2025-04-02", "₩2,890,000", "10"],
      ];

      const csvContent = data.map(row => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", "sales_data.csv");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: translations.exportData[language],
        description: "CSV file has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      disabled={isLoading}
      className="ml-auto"
    >
      <Download className="mr-2 h-4 w-4" />
      {isLoading ? translations.downloading[language] : translations.exportData[language]}
    </Button>
  );
};

export default ExportButton;
