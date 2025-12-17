import DashboardLayout from './components/DashboardLayout';
import ExecutiveSummary from './components/ExecutiveSummary';
import RiskHeatmap from './components/RiskHeatmap';
import SystemsTable from './components/SystemsTable';

function App() {
  return (
    <DashboardLayout>
      <ExecutiveSummary />
      <RiskHeatmap />
      <SystemsTable />
    </DashboardLayout>
  );
}

export default App;
