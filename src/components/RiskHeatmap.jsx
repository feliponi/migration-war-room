import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { sapModules } from '../data/mockData';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const RiskHeatmap = () => {
  // Transform data for Treemap
  const treeMapData = sapModules.map(module => ({
    name: module.name,
    size: module.budget,
    status: module.status,
    completion: module.completion,
    systemCount: module.systemCount,
    owner: module.owner,
    criticalRisks: module.criticalRisks,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return '#ef4444'; // red-500
      case 'warning':
        return '#f59e0b'; // amber-500
      case 'on-track':
        return '#10b981'; // emerald-500
      default:
        return '#64748b'; // slate-500
    }
  };

  const CustomizedContent = (props) => {
    const { x, y, width, height, name, status, completion, systemCount } = props;

    if (width < 80 || height < 80) {
      return null;
    }

    const StatusIcon =
      status === 'critical' ? AlertCircle :
      status === 'warning' ? AlertTriangle :
      CheckCircle;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getStatusColor(status),
            fillOpacity: 0.15,
            stroke: getStatusColor(status),
            strokeWidth: 2,
            strokeOpacity: 0.8,
          }}
        />
        <foreignObject x={x} y={y} width={width} height={height}>
          <div className="p-3 h-full flex flex-col justify-between text-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={`w-4 h-4`} style={{ color: getStatusColor(status) }} />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  {name.split('(')[1]?.replace(')', '') || name.split(' ')[0]}
                </span>
              </div>
              <div className="text-xs text-slate-300">
                {systemCount} system{systemCount !== 1 ? 's' : ''}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold mb-1">{completion}%</div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${completion}%`,
                    backgroundColor: getStatusColor(status),
                  }}
                />
              </div>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
          <p className="font-semibold text-slate-100 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Owner:</span>
              <span className="text-slate-100 font-medium">{data.owner}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Systems:</span>
              <span className="text-slate-100 font-medium">{data.systemCount}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Completion:</span>
              <span className="text-emerald-400 font-medium">{data.completion}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Budget:</span>
              <span className="text-slate-100 font-medium">
                ${(data.size / 1000000).toFixed(1)}M
              </span>
            </div>
            {data.criticalRisks > 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Critical Risks:</span>
                <span className="text-red-400 font-medium">{data.criticalRisks}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Status:</span>
              <span
                className={`font-semibold uppercase text-xs ${
                  data.status === 'critical'
                    ? 'text-red-400'
                    : data.status === 'warning'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {data.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-2">Module Health Matrix</h2>
        <p className="text-sm text-slate-400">
          Size represents budget allocation, color indicates status
        </p>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treeMapData}
            dataKey="size"
            stroke="#1e293b"
            strokeWidth={3}
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-slate-300">On Track</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-slate-300">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-slate-300">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatmap;
