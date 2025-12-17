import { TrendingUp, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { projectMetadata, getDerivedMetrics } from '../data/mockData';

const ExecutiveSummary = () => {
  const metrics = getDerivedMetrics();
  const budgetRemaining = projectMetadata.totalBudget - projectMetadata.budgetConsumed;

  const kpiCards = [
    {
      title: "Budget Consumed",
      value: `$${(projectMetadata.budgetConsumed / 1000000).toFixed(1)}M`,
      subtitle: `of $${(projectMetadata.totalBudget / 1000000).toFixed(1)}M`,
      percentage: parseFloat(metrics.budgetPercentage),
      icon: DollarSign,
      color: parseFloat(metrics.budgetPercentage) > 85 ? "text-amber-400" : "text-emerald-400",
      bgColor: parseFloat(metrics.budgetPercentage) > 85 ? "bg-amber-500/10" : "bg-emerald-500/10",
    },
    {
      title: "Overall Completion",
      value: `${projectMetadata.overallCompletion}%`,
      subtitle: "Systems migrated",
      percentage: projectMetadata.overallCompletion,
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Days to Go-Live",
      value: metrics.daysToGoLive,
      subtitle: new Date(projectMetadata.goLiveDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      percentage: null,
      icon: Calendar,
      color: metrics.daysToGoLive < 60 ? "text-amber-400" : "text-blue-400",
      bgColor: metrics.daysToGoLive < 60 ? "bg-amber-500/10" : "bg-blue-500/10",
    },
    {
      title: "Critical Risks",
      value: metrics.criticalCount,
      subtitle: `${metrics.warningCount} warnings`,
      percentage: null,
      icon: AlertTriangle,
      color: metrics.criticalCount > 0 ? "text-red-400" : "text-emerald-400",
      bgColor: metrics.criticalCount > 0 ? "bg-red-500/10" : "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiCards.map((card, index) => (
        <div
          key={index}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-slate-100">{card.value}</h3>
              <p className="text-slate-500 text-xs mt-1">{card.subtitle}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>

          {card.percentage !== null && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Progress</span>
                <span className={`font-semibold ${card.color}`}>{card.percentage}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    card.percentage > 85
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  }`}
                  style={{ width: `${Math.min(card.percentage, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExecutiveSummary;
