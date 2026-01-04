import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { PricePoint, formatPrice } from "@/data/mockData";

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
}

export const PriceHistoryChart = ({ priceHistory }: PriceHistoryChartProps) => {
  const minPrice = Math.min(...priceHistory.map((p) => p.price));
  const maxPrice = Math.max(...priceHistory.map((p) => p.price));
  const lowestIndex = priceHistory.findIndex((p) => p.price === minPrice);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-3"
        >
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="price-tag text-lg font-bold text-primary">
            {formatPrice(payload[0].value)}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.marketplace}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-sm text-muted-foreground block">Lowest</span>
            <span className="price-tag text-xl font-bold text-success">
              {formatPrice(minPrice)}
            </span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block">Highest</span>
            <span className="price-tag text-xl font-bold text-destructive">
              {formatPrice(maxPrice)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted-foreground block">Last 30 days</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 15%, 50%)", fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 15%, 50%)", fontSize: 12 }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              domain={["dataMin - 1000", "dataMax + 1000"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(172, 66%, 40%)"
              strokeWidth={2}
              fill="url(#priceGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-success pulse-glow" />
        <span>Lowest price was on {new Date(priceHistory[lowestIndex]?.date).toLocaleDateString("en-IN", { 
          day: "numeric", 
          month: "long" 
        })}</span>
      </div>
    </motion.div>
  );
};
