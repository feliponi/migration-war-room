import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { legacySystems, sapModules } from '../data/mockData';

const SystemsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'progress', direction: 'asc' });

  // Get unique modules for filter
  const modules = [...new Set(sapModules.map(m => m.id))];

  // Filtered and sorted data
  const filteredSystems = useMemo(() => {
    let filtered = legacySystems.filter(system => {
      const matchesSearch =
        system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        system.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || system.status === statusFilter;
      const matchesModule = moduleFilter === 'all' || system.module === moduleFilter;

      return matchesSearch && matchesStatus && matchesModule;
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'decommissionDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, moduleFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      critical: 'bg-red-500/10 text-red-400 border-red-500/30',
      warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      'on-track': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${styles[status]}`}
      >
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getModuleName = (moduleId) => {
    const module = sapModules.find(m => m.id === moduleId);
    return module ? module.name.split('(')[1]?.replace(')', '') || module.name : moduleId.toUpperCase();
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Legacy Systems Inventory</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search systems or owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="on-track">On Track</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Module Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 appearance-none cursor-pointer"
            >
              <option value="all">All Modules</option>
              {modules.map(mod => (
                <option key={mod} value={mod}>
                  {getModuleName(mod)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-slate-400">
          Showing {filteredSystems.length} of {legacySystems.length} systems
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-slate-100"
                >
                  System Name
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('decommissionDate')}
                  className="flex items-center gap-2 hover:text-slate-100"
                >
                  Decommission Date
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('progress')}
                  className="flex items-center gap-2 hover:text-slate-100"
                >
                  Progress
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('issuesOpen')}
                  className="flex items-center gap-2 hover:text-slate-100"
                >
                  Issues
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredSystems.map((system) => (
              <tr
                key={system.id}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-100">{system.name}</div>
                  <div className="text-xs text-slate-400">{system.region}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{system.owner}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase">
                    {getModuleName(system.module)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {new Date(system.decommissionDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden min-w-[100px]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          system.progress >= 80
                            ? 'bg-emerald-500'
                            : system.progress >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${system.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-100 min-w-[40px]">
                      {system.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(system.status)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${
                      system.issuesOpen > 10
                        ? 'text-red-400'
                        : system.issuesOpen > 5
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {system.issuesOpen}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSystems.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400">No systems found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default SystemsTable;
