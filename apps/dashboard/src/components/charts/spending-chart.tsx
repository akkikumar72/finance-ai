"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import { formatAmount } from "@/utils/format";
import { Skeleton } from "@midday/ui/skeleton";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CategoryIcon, mapCategoryColor } from "../category";

const ToolTipContent = ({ payload = [] }) => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const item = payload.at(0)?.payload;

  return (
    <div className="rounded-xl border shadow-sm bg-background p-1">
      <div className="px-4 py-2 flex justify-between items-center space-x-12">
        <div className="text-sm font-medium flex items-center space-x-2">
          {item?.category && <CategoryIcon name={item.category} />}
          <p>
            {item?.amount &&
              formatAmount({
                amount: item.amount,
                currency: item.currency,
                locale,
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}
          </p>
        </div>
        <p className="text-sm text-[#606060]">
          {item?.category && t(`categories.${item.category}`)}
        </p>
      </div>
    </div>
  );
};

export function SpendingChart({ categories, currency, totalAmount, disabled }) {
  const locale = useCurrentLocale();

  return (
    <ResponsiveContainer width="100%">
      <PieChart width={200} height={200}>
        <Tooltip content={ToolTipContent} />

        <Pie
          stroke="none"
          isAnimationActive={false}
          data={categories}
          innerRadius={170 / 2}
          outerRadius={200 / 2}
          fill="#8884d8"
          dataKey="amount"
        >
          {!disabled && (
            <Label
              value={formatAmount({
                amount: totalAmount,
                currency,
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
                locale,
              })}
              position="center"
              fontSize={23}
              fill="hsl(var(--foreground))"
              fontFamily="var(--font-sans)"
            />
          )}

          {categories?.map(({ category }, index) => (
            <Cell key={`cell-${index}`} fill={mapCategoryColor(category)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
