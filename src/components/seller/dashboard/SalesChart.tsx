
import React from "react";
import { Language } from "@/hooks/useLanguageStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface SalesChartProps {
  language: Language;
}

const translations = {
  monthlySales: {
    KR: "월별 매출",
    EN: "Monthly Sales",
    CN: "月度销售",
    JP: "月次売上",
  },
};

const sampleData = [
  { month: "Jan", sales: 2500000 },
  { month: "Feb", sales: 3200000 },
  { month: "Mar", sales: 4100000 },
  { month: "Apr", sales: 3800000 },
  { month: "May", sales: 4500000 },
  { month: "Jun", sales: 5200000 },
];

const SalesChart: React.FC<SalesChartProps> = ({ language }) => {
  return (
    <Card className="col-span-3 h-auto">
      <CardHeader>
        <CardTitle>{translations.monthlySales[language]}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => 
                `₩${(value / 1000000).toFixed(1)}M`
              }
            />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="sales"
              name="sales"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
